//useFetch.js
import { useState, useMemo } from 'react';
import axios from 'axios';

export default function useFetch(url, header) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [reFetch, setRefetch] = useState(false);

  useMemo(() => {
    // console.log('Running useFetch!');
    if (url || reFetch) {
      setRefetch(false);
      setLoading(true);
      setError(null);
      const source = axios.CancelToken.source();
      if (url) {
        if (header) {
          axios
            .get(url, header)
            .then((response) => response.data)
            .then((res) => {
              // console.log(res.data);
              setLoading(false);
              //checking for multiple responses for more flexibility
              //with the url we send in.
              res.data && setData(res.data);
              // console.log('Fetching successful!');
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
              // console.log('Fetching successful!');
            })
            .catch((err) => {
              setLoading(false);
              setError('An error occurred. Awkward..');
            });
          return () => {
            source.cancel();
          };
        }
      } else {
        setLoading(false);
        setData([]);
      }
    }
  }, [url, reFetch]);

  // const reFetch = () => {
  //   setLoading(true);
  //   setError(null);
  //   const source = axios.CancelToken.source();
  //   if (url) {
  //     if (header) {
  //       axios
  //         .get(url, header)
  //         .then((response) => response.data)
  //         .then((res) => {
  //           // console.log(res.data);
  //           setLoading(false);
  //           //checking for multiple responses for more flexibility
  //           //with the url we send in.
  //           res.data && setData(res.data);
  //           // console.log('Fetching successful!');
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           setError('An error occurred. Awkward.. ' + err);
  //         });
  //       return () => {
  //         source.cancel();
  //       };
  //     } else {
  //       axios
  //         .get(url, { cancelToken: source.token })
  //         .then((res) => {
  //           setLoading(false);
  //           //checking for multiple responses for more flexibility
  //           //with the url we send in.
  //           res.data && setData(res.data);
  //           // console.log('Fetching successful!');
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           setError('An error occurred. Awkward.. ' + err);
  //         });
  //       return () => {
  //         source.cancel();
  //       };
  //     }
  //   } else {
  //     setLoading(false);
  //     setData([]);
  //   }
  // };

  return { data, setData, setRefetch, loading, error };
}
