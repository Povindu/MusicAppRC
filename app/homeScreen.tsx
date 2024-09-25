import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


import { useDispatch, useSelector } from "react-redux";
import { setSongList, setSelectedSong } from "../redux/slices/songSlice";
import { searchSongs } from "../utils/api";
import { RootState } from "../redux/store";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { songList } = useSelector((state: RootState) => state.songs);
  const router = useRouter();

  useEffect(() => {
    searchSongs("jack johnson")
      .then((response) => {
        dispatch(setSongList(response.data.results));
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  const handlePress = (song: any) => {
    dispatch(setSelectedSong(song));
    router.push("/details");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songList}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Image
                source={{ uri: item.artworkUrl100 }}
                style={{ width: 50, height: 50 }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text1}>{item.trackName}</Text>
                <View style={styles.textView}>
                  <Text style={styles.text2}>{item.artistName}</Text>
                  <Text style={styles.text3}>
                    {" "}
                    {item.collectionName ? "\u2022 " : ""} {item.collectionName}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },

  textContainer: {
    marginLeft: 1,
    color: "white",
  },
  text1: {
    color: "white",
    marginLeft: 8,
  },
  text2: {
    color: "white",
    marginLeft: 8,
    fontSize: 12,
  },
  text3: {
    color: "white",
    marginLeft: 8,
    fontSize: 12,
    width: "80%",
  },
  textView: {
    flexDirection: "row",
  },
});
