import { PresenceTransition } from 'native-base';
import React from 'react';

function FadeTransition({ animated, children }) {
  return (
    <PresenceTransition
      visible={animated ? true : false}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 500,
        },
      }}
    >
      {children}
    </PresenceTransition>
  );
}

export default FadeTransition;
