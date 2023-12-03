import axios from 'axios';
import type { CharacterList, CharacterFilter, Character } from '~/types/character';

export const useCharacterStore = defineStore('character', () => {
  const data = ref<CharacterList>();
  const infiniteData = ref<Character[]>([]);
  const detailedData = ref<Character>();
  const errorResponse = ref();

  const config = useRuntimeConfig();

  async function getList(params?: Partial<CharacterFilter>) {
    try {
      const response = await axios.get<CharacterList>('/character', {
        baseURL: config.public.apiUrl,
        params,
      });
      data.value = response.data;
      infiniteData.value = infiniteData.value.concat(response.data.results);
    } catch (error) {
      errorResponse.value = error;
    }
  }

  async function getDetailed(id: string) {
    try {
      const response = await axios.get<Character>(`/character/${id}`, {
        baseURL: config.public.apiUrl,
      });
      detailedData.value = response.data;
    } catch (error) {
      errorResponse.value = error;
    }
  }

  return {
    data,
    infiniteData,
    detailedData,
    errorResponse,
    getList,
    getDetailed,
  };
});
