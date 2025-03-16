import { createStackNavigator } from "@react-navigation/stack";
import ShowCreateNotes from "../(tabs)/ShowCreateNotes";
import FavScreen from "../(tabs)/FavScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={ShowCreateNotes} />
      <Stack.Screen name="Favorites" component={FavScreen} />
    </Stack.Navigator>
  );
}
// const styles = StyleSheet.create({
//   titleContainer: {
//     flex: 1,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
