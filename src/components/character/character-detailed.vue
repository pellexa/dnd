<template>
  <div :class="['character__card', classList]">
    <img class="character__image" :src="character.image" />
    <div class="character__name">{{ character.name }} ({{ character.species }})</div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/character';

const props = defineProps<{ character: Character; classes?: string[] }>();

const propsClasses = ref(props.classes);
const classList = computed(() => (propsClasses.value ? propsClasses.value : ''));
</script>

<style>
.character__card {
  max-width: 300px;
  margin: 0 auto;
}

.character__image {
  width: 100%;
  height: auto;
}

.character__name {
  text-align: center;
}
</style>
