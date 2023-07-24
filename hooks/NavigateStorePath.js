export default function NavigateStorePath(navigation, path, dispatch) {
  navigation.navigate(path);
  dispatch({ type: 'SET_PATHNAME', payload: path });
}
