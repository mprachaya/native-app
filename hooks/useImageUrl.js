import axios from 'axios';
import { Image } from 'native-base';
import { useEffect, useState } from 'react';

async function useImageUrl() {
  const apiUrl = 'http://111.223.38.20/private/files/stk.png';
  const token = '5891d01ccc2961e:0e446b332dc22aa';

  const headers = {
    Authorization: `token ${token}`,
  };
  const response = await axios.get(apiUrl, {
    headers,
    responseType: 'blob', // Response type as array buffer to handle binary data
  });
  console.log('Image:', response.data);
}

export default useImageUrl;
