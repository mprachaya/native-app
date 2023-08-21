export const FilterList = (list, setList, keys, values) => {
  if (list.length > 0) {
    // var updatedList = [...list];
    // console.log('sort Type =', type);

    var FilterList = list.filter(function (e) {
      return keys.every(function (key) {
        return values.includes(e[key]);
      });
    });

    console.log('Filter Data: ', FilterList);
    // if (type === 'DESC') setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? -1 : 1)));
    // else {
    //   setList(() => [...updatedList].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
    // }
  }
};
