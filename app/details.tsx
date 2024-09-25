import React from "react";
import { View, Text, Image, Button, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedSong } from "../redux/slices/songSlice";
import { RootState } from "../redux/store";
import { useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedSong } = useSelector((state: RootState) => state.songs);

  if (!selectedSong) {
    return (
      <View>
        <Text>No Song Selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => {
            dispatch(clearSelectedSong());
            router.back();
          }}
        >
          <AntDesign name="leftcircle" size={24} color="black" />
        </Pressable>

        <Text style={styles.heading}>{selectedSong.trackName}</Text>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedSong.artworkUrl100 }}
            style={styles.image}
          />
          <View style={styles.textView2}>
            <Text style={styles.text3}> Genre: </Text>
            <Text style={styles.text2}> </Text>
          </View>
          <View style={styles.textView2}>
            <Text style={styles.text3}> Country: </Text>
            <Text style={styles.text2}> </Text>
          </View>
        </View>
        <Text style={styles.text}>Artist Name: {selectedSong.artistName}</Text>
        <Text style={styles.text}>
          Collection Name: {selectedSong.collectionName}
        </Text>
        <Text style={styles.text}>Track Price: {selectedSong.trackPrice}</Text>
        <Text style={styles.text}>
          Release Date: {selectedSong.releaseDate}
        </Text>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#111111",
    color: "white",
  },
  heading: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },

  image: {
    position: "relative",
    borderRadius: 5,
    width: 140,
    height: 140,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  text2: {
    color: "white",
  },
  topBar: {
    flex: 0.3,
    padding: 30,
    backgroundColor: "#FBBC05",
  },
  bottomBar: {
    position: "relative",
    top: -140,

    flex: 0.7,
    padding: 30,
  },
  imageContainer: {
    flexDirection: "row",
  },
  textView2: {
    flexDirection: "column",
    marginLeft: 10,
  },
  text3: {
    color: "black",
    width: 100,
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10,
  },
});
