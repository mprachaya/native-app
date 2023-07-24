import { useContext, useEffect } from 'react';
import { Context } from '../reducer';

// this function for set path name to the current page
function DetectBack(navigation, path) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const handleBack = navigation.addListener('focus', () => {
      dispatch({ type: 'SET_PATHNAME', payload: path });
    });
    return handleBack;
  }, [navigation]);
}

export default DetectBack;
