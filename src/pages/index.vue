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
      <template v-for="character in results" :key="character.id">
        <CharacterDetailed
          :character="character"
          :isLink="true"
          :id="character.id.toString()"
          :classes="['character__list-card']"
        >
          <ul v-for="episode in episodes(character.episode)" :key="episode">
            <li class="character__episode">
              <NuxtLink :to="`/episode/${episode}`"> эпизод {{ episode }} </NuxtLink>
            </li>
          </ul>
        </CharacterDetailed>
      </template>
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

const debounceParamsWatch = debounce(async (newValue, oldValue) => {
  characterStore.infiniteData = [];

  await navigateTo({
    query: newValue,
    replace: true,
  });

  await characterStore.getList(newValue);
}, 300);

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

watch(params, debounceParamsWatch);

const fillFilter = () => {
  const query = route.query;

  for (const keyFilter in filter) {
    for (const key in query) {
      if (keyFilter === key) {
        filter[keyFilter as keyof CharacterFilter] = query[key] as string;
      }
    }
  }
};

onMounted(async () => {
  fillFilter();

  if (Object.keys(params.value).length < 1) {
    await characterStore.getList(params.value);
  }

  infiniteScroll();
  document.addEventListener('scroll', infiniteScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', infiniteScroll);
});

const data = computed(() => characterStore.data);
const info = computed(() => data.value?.info);
const results = computed(() => characterStore.infiniteData);
const nextPage = ref<string | null>(null);

const episodes = computed(() => {
  return (arr: Character['episode']) => {
    const result = arr.slice(0, 5).map((item) => {
      // Cut id from url
      const id = item.match(/[0-9]+$/g)!;
      return id[0];
    });

    return result;
  };
});

const infiniteScroll = () => {
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const endPage = clientHeight + scrollTop + clientHeight * 0.3 >= scrollHeight && scrollTop;

  if (!endPage) {
    return;
  }

  if (!info.value?.next) {
    return;
  }

  nextPage.value = info.value.next;
};

watch(nextPage, async (newValue, oldValue) => {
  if (!newValue) {
    return;
  }

  const paneNumber = newValue.replace(/^.*page=([0-9]+).*$/g, '$1');

  await characterStore.getList({ page: paneNumber, ...params.value });
});
</script>

<style>
.character__select {
  margin-top: 1em;
}

.character__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character__list-card {
  margin: 1em;
  max-width: 300px;
}

.character__episode {
  text-align: center;
}

.character__episode::first-letter {
  text-transform: uppercase;
}
</style>
