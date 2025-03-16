import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useToast } from "react-native-toast-notifications";

export default function Editor() {
  const navigation = useNavigation();
  // const toast = useToast();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const saveInput = async () => {
    if (!title.trim() || !notes.trim()) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }

    try {
      const newNote = {
        id: Date.now(), // Unique ID
        title,
        notes,
        favorite: false, // Default is not favorite
      };

      const existingNotes = await AsyncStorage.getItem("savedNotes");
      const updatedNotes = existingNotes ? JSON.parse(existingNotes) : [];

      updatedNotes.push(newNote);
      await AsyncStorage.setItem("savedNotes", JSON.stringify(updatedNotes));

      setTitle("");
      setNotes("");
      // toast.show("notes added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.top}>
            {" "}
            <TextInput
              placeholder="Title :"
              placeholderTextColor={"white"}
              value={title}
              multiline

              onChangeText={setTitle}
              style={styles.TextInput}
            />
            <TextInput
              placeholderTextColor={"white"}
              multiline
              placeholder="Notes :"
              value={notes}
              onChangeText={setNotes}
              style={styles.TextInput}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={saveInput} style={styles.button}>
              <Text style={styles.appButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  top: {
    // flex: 1,
    // backgroundColor: "aqua",
    padding: 20,
    rowGap: 50,
  },
  bottom: {
    marginBottom: 80,
    padding: 80,
  },
  button: {
    width: 225,
    height: 59,
    borderRadius: 20,
    backgroundColor: "rgba(217, 217, 217, 1)",
  },
  appButtonText: {
    color: "black",
    marginLeft: 95,
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  TextInput: {
    color: "rgba(217, 217, 217, 1)",
    fontSize: 20,
    fontWeight: "bold",
    height: "auto",
  },
});
