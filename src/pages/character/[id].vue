<template>
  <h2>Character page</h2>

  <template v-if="character">
    <CharacterDetailed :character="character">
      <div class="character__location">{{ character.location.name }}</div>
    </CharacterDetailed>
  </template>
  <template v-else>
    <h3>нет данных</h3>
  </template>
</template>

<script setup lang="ts">
const route = useRoute();
const characterStore = useCharacterStore();

const character = computed(() => characterStore.detailedData);

onMounted(async () => {
  await characterStore.getDetailed(route.params.id as string);
});
</script>

<style>
.character__location {
  text-align: center;
}

.character__location::first-letter {
  text-transform: uppercase;
}
</style>
