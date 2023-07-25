import { Image } from 'native-base';

function FrappeLogo({ size }) {
  if (size === 'xs') {
    return (
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/836974?s=200&v=4',
        }}
        alt='frappe-logo'
        size='8'
        rounded={6}
      />
    );
  }
  if (size === 'sm') {
    return (
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/836974?s=200&v=4',
        }}
        alt='frappe-logo'
        size='sm'
        rounded={6}
      />
    );
  }
  if (size === 'md') {
    return (
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/836974?s=200&v=4',
        }}
        alt='frappe-logo'
        size='md'
        rounded={6}
      />
    );
  }
  if (size === 'lg') {
    return (
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/836974?s=200&v=4',
        }}
        alt='frappe-logo'
        size='lg'
        rounded={6}
      />
    );
  }
}
export default FrappeLogo;
