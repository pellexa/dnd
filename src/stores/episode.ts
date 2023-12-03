import axios from 'axios';
import type { Episode } from '~/types/episode';
import type { Character } from '~/types/character';

export const useEpisodeStore = defineStore('episode', () => {
  const detailedData = ref<Episode>();
  const multipleCharacters = ref<Character[]>();
  const errorResponse = ref();

  const config = useRuntimeConfig();

  async function getDetailed(id: string) {
    try {
      const response = await axios.get<Episode>(`/episode/${id}`, {
        baseURL: config.public.apiUrl,
      });
      detailedData.value = response.data;
    } catch (error) {
      errorResponse.value = error;
    }
  }

  async function getMultipleCharacters(ids: number[]) {
    try {
      const response = await axios.get<Character[]>(`/character/${ids}`, {
        baseURL: config.public.apiUrl,
      });
      multipleCharacters.value = response.data;
    } catch (error) {
      errorResponse.value = error;
    }
  }

  return {
    detailedData,
    multipleCharacters,
    errorResponse,
    getDetailed,
    getMultipleCharacters,
  };
});
