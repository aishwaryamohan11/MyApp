import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "./../../assets/images/notesslogo.png";

type RootStackParamList = {
  Favorites: undefined;
  Home: undefined; // Define screen names and params (if any)
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Favorites">;

export default function NavBar() {
  const navigation = useNavigation<NavigationProp>();

  const MoveToFav = () => {
    navigation.navigate("Favorites");
  };
  const MoveToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <TouchableOpacity onPress={MoveToHome} activeOpacity={1}>
            <Image
              source={logo}
              alt="logo"
              style={styles.logo}
              // onPress={MoveToHome}
            />
            <Text>sdfds</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <View>
            {" "}
            <MaterialIcons
              name="favorite"
              size={30}
              color="white"
              onPress={MoveToFav}
            />{" "}
          </View>
          {/* <View style={styles.icon}>
          {" "}
          <MaterialIcons name="search" size={30} color="white" />{" "}
        </View> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingBottom: 16,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  left: {
    // backgroundColor: "aqua",
  },
  logo: {
    height: 80,
    width: 250,
  },
  right: {
    backgroundColor: "black",

    flexDirection: "row",

    gap: 20,
    marginTop: 20,
  },
});
