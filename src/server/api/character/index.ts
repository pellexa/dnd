export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const response = await $fetch('/character', {
    method: 'GET',
    baseURL: config.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    query,
  }).catch((error) => {
    console.log('(character) Error: ', error);
    return error;
  });

  return response;
});
