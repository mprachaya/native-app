import { useMediaQuery } from 'native-base';

import React from 'react';

function GetScreenSize({ type, children }) {
  [isSmallScreen] = useMediaQuery({
    minWidth: 200,
    maxWidth: 400,
  });
  const [isMediumScreen] = useMediaQuery({
    minWidth: 600,
    maxWidth: 1000,
  });
  const [isLargeScreen] = useMediaQuery({
    minWidth: 1200,
    maxWidth: 1600,
  });

  if (type === 'sm') {
    return <>{isSmallScreen && children}</>;
  }
  if (type === 'md') {
    return <>{isMediumScreen && children}</>;
  }
  if (type === 'lg') {
    return <>{isLargeScreen && children}</>;
  }
}

export default GetScreenSize;
