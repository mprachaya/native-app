export const SortBy = (list, setList, key, type) => {
  if (list.length > 0) {
    var updatedList = [...list];
    // console.log('sort Type =', type);
    if (type === 'DESC') setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? -1 : 1)));
    else {
      setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
    }
  }
};
