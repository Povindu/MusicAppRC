import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Login from "../screens/LoginScreen";

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Login />
      </View>
    </>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111111"},
});
