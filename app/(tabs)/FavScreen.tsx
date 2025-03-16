import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "@/components/navBar/NavBar";
import Card from "@/components/ui/card/Card";

type Note = {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
};

export default function FavScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Note[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchFavorites);
    return unsubscribe;
  }, [navigation]);

  const fetchFavorites = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("savedNotes");
      if (savedNotes) {
        const allNotes: Note[] = JSON.parse(savedNotes);
        const favNotes = allNotes.filter((note: Note) => note.favorite);
        setFavorites(favNotes);
      }
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  };

  const toggleFavorite = async (id: number) => {
    try {
      const savedNotes = await AsyncStorage.getItem("savedNotes");
      if (savedNotes) {
        let allNotes: Note[] = JSON.parse(savedNotes);
        allNotes = allNotes.map((note) =>
          note.id === id ? { ...note, favorite: !note.favorite } : note
        );

        await AsyncStorage.setItem("savedNotes", JSON.stringify(allNotes));
        fetchFavorites();
      }
    } catch (error) {
      console.error("Error updating favorite", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const savedNotes = await AsyncStorage.getItem("savedNotes");
            if (savedNotes) {
              let allNotes: Note[] = JSON.parse(savedNotes);
              allNotes = allNotes.filter((note: Note) => note.id !== id);

              await AsyncStorage.setItem(
                "savedNotes",
                JSON.stringify(allNotes)
              );

              // ✅ Update state directly
              setFavorites(allNotes.filter((note) => note.favorite));
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <NavBar />
        <View style={styles.bottom}>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Card
                item={item}
                index={index}
                toggleFavorite={toggleFavorite}
                deleteItem={deleteItem}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
  wrapper: {
    height: "100%",
  },
  bottom: {
    marginBottom: 150,
    // backgroundColor: "aqua",
    alignItems: "center",
    height: "auto",
    // justifyContent: "center",
  },
});
