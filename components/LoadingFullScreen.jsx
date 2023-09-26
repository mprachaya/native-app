import { HStack, Heading, PresenceTransition, Spinner } from 'native-base';
import { COLORS } from '../constants/theme';

export function LoadingFullScreen(loading) {
  return (
    <PresenceTransition
      style={{
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      visible={loading}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 250,
        },
      }}
    >
      <HStack
        pb={'96'}
        space={2}
        justifyContent={'center'}
      >
        <Spinner
          color={COLORS.white}
          accessibilityLabel='Loading posts'
        />
        <Heading
          color={'primary.400'}
          fontSize='md'
        >
          Loading
        </Heading>
      </HStack>
    </PresenceTransition>
  );
}
