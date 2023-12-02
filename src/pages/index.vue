<template>
  <h1>персонажи</h1>

  <template v-if="data">
    <BaseInput v-model="filter.name" labelName="имя" name="character-name" id="character_name" />

    <BaseSelect
      v-model="filter.status"
      labelName="статус"
      name="character-status"
      id="character_status"
      :options="selectStatusOption"
      class="character__select"
    />

    <ul class="character__list">
      <li v-for="character in results" class="character__card">
        <img class="character__image" :src="character.image" />
        <div class="character__name">{{ character.name }} ({{ character.species }})</div>
        <ul v-for="episode in episodes(character.episode)">
          <li class="character__episode">эпизод {{ episode }}</li>
        </ul>
      </li>
    </ul>
  </template>
  <template v-else>
    <h3>нет данных</h3>
  </template>
</template>

<script setup lang="ts">
import type { Character, CharacterFilter } from '@/types/character';

const selectStatusOption = reactive([
  { value: 'alive', text: 'живой' },
  { value: 'dead', text: 'мертвый' },
  { value: 'unknown', text: 'неизвестно' },
]);

const filter = reactive<CharacterFilter>({
  name: '',
  status: '',
});

const route = useRoute();
const characterStore = useCharacterStore();

const params = computed(() => {
  // Exclude empty value
  const currentFilter = Object.entries(filter).reduce((acc, [key, value]) => {
    if (value.trim()) {
      acc[key] = value.trim();
    }

    return acc;
  }, {} as { [key: string]: string });

  return currentFilter;
});

watch(params, async (newValue, oldValue) => {
  await navigateTo({
    query: newValue,
    replace: true,
  });

  await characterStore.getList(newValue);
});

onMounted(async () => {
  const params = route.query;

  for (const keyFilter in filter) {
    for (const key in params) {
      if (keyFilter === key) {
        filter[keyFilter as keyof CharacterFilter] = params[key] as string;
      }
    }
  }

  await characterStore.getList(filter);
});

const data = computed(() => characterStore.data);
const results = computed(() => data.value?.results);

const episodes = computed(() => {
  return (arr: Character['episode']) => {
    const result = arr.slice(0, 5).map((item) => {
      // Cut id from url
      const id = item.match(/[0-9]+$/g);
      return id ? id[0] : null;
    });

    return result;
  };
});
</script>

<style>
.character__select {
  margin-top: 1em;
}

.character__list {
  display: flex;
  flex-wrap: wrap;
}

.character__card {
  margin: 1em;
}

.character__image {
  width: 100%;
  height: auto;
}

.character__name {
  text-align: center;
}

.character__episode {
  text-align: center;
}
</style>
