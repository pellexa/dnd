import axios from 'axios';
import type { CharacterList, CharacterFilter } from '~/types/character';

export const useCharacterStore = defineStore('character', () => {
  const data = ref<CharacterList>();
  const errorResponse = ref();

  async function getList(params?: Partial<CharacterFilter>) {
    try {
      const response = await axios.get<CharacterList>('/api/character', {
        params,
      });
      data.value = response.data;
    } catch (error) {
      errorResponse.value = error;
    }
  }

  return {
    data,
    errorResponse,
    getList,
  };
});
