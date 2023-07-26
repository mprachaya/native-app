import { useContext, useMemo } from 'react';
import { Context } from '../reducer';

// this function for set path name to the current page
function DetectBack(navigation, path) {
  const [state, dispatch] = useContext(Context);

  useMemo(() => {
    const handleBack = navigation.addListener('focus', () => {
      dispatch({ type: 'SET_PATHNAME', payload: path });
    });
    return handleBack;
  }, [navigation]);
}

export default DetectBack;
