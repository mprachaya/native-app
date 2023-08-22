export const FilterList = (list, setList, filterData, reFetch) => {
  const dataTemp = [...list];
  // if (filterData.length > 0) {
  // create new object for re formatting filter data and get only not equal ''
  const newObjFilter = [];
  // filtering
  newObjFilter[0] = Object.fromEntries(Object.entries(filterData)?.filter(([value]) => value !== ''));
  // console.log(newObjFilter[0]);
  const result = dataTemp.filter((item) => {
    if (Object.keys(newObjFilter[0]).length > 0) {
      for (let key in newObjFilter[0]) {
        if (item[key] === '' || !newObjFilter[0][key].includes(item[key])) {
          return false;
          // console.log(filterData[key]);
        }
      }
    }
    return true;
  });
  setList(result);
  console.log(result);
};
