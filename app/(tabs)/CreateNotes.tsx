import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import NavBar from "@/components/navBar/NavBar";
import Editor from "@/components/ui/editor/Editor";

export default function CreateNotes() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <NavBar />
        </View>
        <View style={styles.bottom}>
          <Editor />
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
  top: {},
  bottom: {},
});
