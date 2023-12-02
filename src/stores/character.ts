import axios from 'axios';
import type { CharacterList, CharacterFilter, Character } from '~/types/character';

export const useCharacterStore = defineStore('character', () => {
  const data = ref<CharacterList>();
  const infiniteData = ref<Character[]>([]);
  const errorResponse = ref();

  async function getList(params?: Partial<CharacterFilter>) {
    try {
      const response = await axios.get<CharacterList>('/api/character', {
        params,
      });
      data.value = response.data;
      infiniteData.value = infiniteData.value.concat(response.data.results);
    } catch (error) {
      errorResponse.value = error;
    }
  }

  return {
    data,
    infiniteData,
    errorResponse,
    getList,
  };
});
