import { useMediaQuery } from 'native-base';
import React from 'react';

function GetScreenSize({ type, children, from, to }) {
  [isSmallScreen] = useMediaQuery({
    minWidth: 200,
    maxWidth: 400,
  });
  const [isMediumScreen] = useMediaQuery({
    minWidth: 600,
    maxWidth: 1000,
  });
  [isSmalltoMediumScreen] = useMediaQuery({
    minWidth: 200,
    maxWidth: 1000,
  });
  [isMediumtoLargeScreen] = useMediaQuery({
    minWidth: 600,
    maxWidth: 1600,
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
  if (from === 'sm' && to === 'md') {
    return <>{isSmalltoMediumScreen && children}</>;
  }
  if (from === 'md' && to === 'lg') {
    return <>{isMediumtoLargeScreen && children}</>;
  }
}

export default GetScreenSize;
