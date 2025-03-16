import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowCreateNotes from "./ShowCreateNotes";
import CreateNotes from "./CreateNotes";
import FavScreen from "./FavScreen";
const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={ShowCreateNotes}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Notes"
        component={CreateNotes}
        options={{ title: "Notes" }}
      />

      <Stack.Screen name="Favorites" component={FavScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
