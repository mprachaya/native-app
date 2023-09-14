export function getDataAPICustom(response) {
  let currentData = response.data.message.data;

  while (currentData && currentData.data) {
    currentData = currentData.data;
  }

  return currentData;
}
