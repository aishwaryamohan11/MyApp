import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import Card from "@/components/ui/card/Card";
import NavBar from "@/components/navBar/NavBar";
import { StackNavigationProp } from "@react-navigation/stack";

type Note = {
  id: number; // Ensure it's a number
  title: string;
  content: string;
  favorite: boolean;
};

type RootStackParamList = {
  Notes: undefined;
  Favorites: undefined;
  // Define screen names and params (if any)
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Favorites">;

export default function ShowCreateNotes() {
  console.log("ShowCreateNotes is rendering...");
  const toast = useToast();
  const navigation = useNavigation<NavigationProp>();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchNotes);
    return unsubscribe;
  }, [navigation]);

  const fetchNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("savedNotes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Error loading notes", error);
    }
  };

  const toggleFavorite = async (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    );
    setNotes(updatedNotes);
    await AsyncStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
  };
  const deleteItem = async (id: number) => {
    try {
      Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const savedNotes = await AsyncStorage.getItem("savedNotes");
            // if (savedNotes) {
            // let allNotes = JSON.parse(savedNotes);
            const allNotes = notes.filter((note) => note.id !== id);
            setNotes(allNotes);
            await AsyncStorage.setItem("savedNotes", JSON.stringify(allNotes));
            // fetchFavorites(); // Refresh favorites after deletion
            toast.show("Note deleted successfully", {
              type: "deleting",
              placement: "top",
              duration: 2000,
            });
            // }
          },
        },
      ]);
    } catch (error) {
      toast.show("Error deleting item");
    }
  };

  const handleGoToAdd = () => {
    navigation?.navigate("Notes");
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperTop}>
          <View style={styles.top}>
            <NavBar />
          </View>
          <View style={styles.bottom}>
            <FlatList
              data={notes}
              keyExtractor={(item) =>
                item.id?.toString() ?? Math.random().toString()
              }
              renderItem={({ item }) => (
                <View>
                  <Card
                    deleteItem={deleteItem}
                    item={item}
                    index={item?.id}
                    toggleFavorite={toggleFavorite}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.wrapperBottom}>
          <MaterialIcons
            name="add"
            size={40}
            color="black"
            style={styles.icon}
            onPress={handleGoToAdd}
          />{" "}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  wrapper: {},
  wrapperTop: {
    position: "relative",
  },
  top: {},
  bottom: {
    paddingBottom: 20,
    height: 640,
    alignItems: "center",
  },

  wrapperBottom: {
    position: "absolute",
    right: 15,
    top: 580,
  },
  icon: {
    borderRadius: 50,
    color: "black",
    padding: 15,
    backgroundColor: "white",
  },
  FlatList: {},
});
