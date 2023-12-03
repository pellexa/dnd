<template>
  <h2>эпизод</h2>

  <template v-if="episode">
    <div class="episode__card">
      <h3>{{ episode.name }} ({{ episode.air_date }})</h3>
      <h3>персонажи эпизода:</h3>
      <ul class="episode__characters">
        <li v-for="character in characters" :key="character.id" class="episode__character">
          <NuxtLink :to="`/character/${character.id}`">
            <img :src="character.image" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <h3>нет данных</h3>
  </template>
</template>

<script setup lang="ts">
const route = useRoute();
const episodeStore = useEpisodeStore();

const episode = computed(() => episodeStore.detailedData);

const characterIds = computed(() => {
  if (!episode.value) {
    return undefined;
  }

  return episode.value.characters.map((url: string) => +url.replace(/^.*\//g, ''));
});

const characters = computed(() => episodeStore.multipleCharacters);

onMounted(async () => {
  await episodeStore.getDetailed(route.params.id as string);

  if (characterIds.value) {
    await episodeStore.getMultipleCharacters(characterIds.value);
  }
});
</script>

<style>
.episode__characters {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}
</style>
