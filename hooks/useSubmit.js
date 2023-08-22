//useFetch.js
import axios from 'axios';

export default function useSubmit(header, url, state, closemodal, refetch) {
  if (state && header) {
    axios
      .post(url, state, header)
      .then((response) => response.data)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log('An error occurred. Awkward.. : ', err);
        alert('Status Error: ' + err);
      })
      .finally(() => {
        closemodal();
        refetch();
      });
  } else {
    return false;
  }
}
