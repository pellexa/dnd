export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const response = await $fetch('/character', {
    method: 'GET',
    baseURL: config.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log('(character) Error: ', error);
    return error;
  });

  return response;
});
