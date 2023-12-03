export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');

  const response = await $fetch(`/episode/${id}`, {
    method: 'GET',
    baseURL: config.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(`/episode/${id} Error:`, error);
    return error;
  });

  return response;
});
