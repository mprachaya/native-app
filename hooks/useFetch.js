//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url, header) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData([]);
    setError(null);
    const source = axios.CancelToken.source();
    if (header) {
      axios
        .get(url, header)
        .then((response) => response.data)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          //checking for multiple responses for more flexibility
          //with the url we send in.
          res.data && setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError('An error occurred. Awkward..');
          console.log(err);
        });
      return () => {
        source.cancel();
      };
    } else {
      axios
        .get(url, { cancelToken: source.token })
        .then((res) => {
          setLoading(false);
          //checking for multiple responses for more flexibility
          //with the url we send in.
          res.data && setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError('An error occurred. Awkward..');
        });
      return () => {
        source.cancel();
      };
    }
  }, [url]);

  return { data, loading, error };
}
