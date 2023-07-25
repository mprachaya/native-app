function SearchFilter(data, sort, sortOption, setData) {
  if (typeof data !== 'undefined' && data !== null) {
    if (!sort) {
      // console.log('desc');
      if (sortOption) {
        // get object key
        Object.keys(data)
          ?.slice(0)
          .map(function (key, index1) {
            Object.keys(data[key])?.forEach(function (key, index2) {
              // if (index1 === 0) {
              // compare between sortOption and object key is matched
              if (key === sortOption) {
                // desc
                return setData(() => [...data].sort((a, b) => (a[key] > b[key] ? -1 : 1)));
              }
              // }
            });
          });
      }
    } else {
      // console.log('asc');
      Object.keys(data)
        ?.slice(0)
        .map(function (key, index1) {
          Object.keys(data[key])?.forEach(function (key, index2) {
            // if (index1 === 0) {
            // compare between sortOption and object key is matched
            if (key === sortOption) {
              // asc
              return setData(() => [...data].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
            }
            // }
          });
        });
    }
  } else {
    console.log('data Loading...');
  }
}

export default SearchFilter;
