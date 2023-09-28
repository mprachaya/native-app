import { useNavigation } from '@react-navigation/native';

export const handleNavigateTo = (navigateTo, params) => {
  const navigation = useNavigation();
  const route = navigation.getState();
  const checkLength = route.routes.length;
  //check if maximum stack replace current with new page
  //maximum stack will make app crashing
  if (checkLength < 5) {
    params !== undefined ? navigation.navigate(navigateTo, params) : navigation.navigate(navigateTo);
  } else {
    params !== undefined ? navigation.replace(navigateTo, params) : navigation.replace(navigateTo);
    // navigation.replace(navigateTo, params);
    // console.log('Maximum Stack!');
  }
};
