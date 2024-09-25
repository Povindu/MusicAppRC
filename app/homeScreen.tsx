import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSongList, setSelectedSong } from "../redux/slices/songSlice";
import { searchSongs } from "../utils/api";
import { RootState } from "../redux/store";
import { useRouter } from "expo-router";

interface Song {
  trackId: any;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackPrice: number;
  releaseDate: string;
  genre: string;
  country: string;
  description: string;
  kind: string;
  longDescription: string;
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { songList } = useSelector((state: RootState) => state.songs);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songList);

  useEffect(() => {
    searchSongs("jack johnson")
      .then((response) => {
        dispatch(setSongList(response.data.results));
        setFilteredSongs(response.data.results);
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  useEffect(() => {
    const filteredData = songList.filter(
      (song) =>
        song.trackName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filteredData);
  }, [searchTerm, songList]);

  const handlePress = (song: Song) => {
    console.log(song);
    dispatch(setSelectedSong(song));
    router.push("/details");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search songs"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={"white"}
      />

      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.songItem}>
              <Image
                source={{ uri: item.artworkUrl100 }}
                style={styles.artwork}
              />
              <View style={styles.songDetails}>
                <Text style={styles.trackName}>{item.trackName}</Text>
                <View style={styles.textView}>
                  <Text style={styles.artistName}>{item.artistName}</Text>
                  <Text style={styles.text3}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#111111",
    paddingTop: 80,
  },
  searchBar: {
    height: 40,
    borderColor: "#FBBC05",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
  },
  songItem: {
    flexDirection: "row",
    padding: 10,
  },
  artwork: {
    width: 50,
    height: 50,
  },
  songDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  trackName: {
    fontSize: 16,
    color: "white",
    marginBottom: 2,
  },
  artistName: {
    fontSize: 12,
    color: "white",
  },
  textView: {
    flexDirection: "row",
  },
  text3: {
    color: "white",
    marginLeft: 8,
    fontSize: 12,
    width: "80%",
  },
});

export default HomeScreen;
