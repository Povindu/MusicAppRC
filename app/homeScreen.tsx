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

  const handlePress = (song: any) => {
    dispatch(setSelectedSong(song));
    router.push("/details");
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search songs or artists"
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={"white"}
      />

      {/* Song List */}
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

// import React, { useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// import { useDispatch, useSelector } from "react-redux";
// import { setSongList, setSelectedSong } from "../redux/slices/songSlice";
// import { searchSongs } from "../utils/api";
// import { RootState } from "../redux/store";
// import { useRouter } from "expo-router";

// const HomeScreen = () => {
//   const dispatch = useDispatch();
//   const { songList } = useSelector((state: RootState) => state.songs);
//   const router = useRouter();

//   useEffect(() => {
//     searchSongs("jack johnson")
//       .then((response) => {
//         dispatch(setSongList(response.data.results));
//       })
//       .catch((error) => console.error(error));
//   }, [dispatch]);

//   const handlePress = (song: any) => {
//     dispatch(setSelectedSong(song));
//     router.push("/details");
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={songList}
//         keyExtractor={(item) => item.trackId.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handlePress(item)}>
//             <View style={{ flexDirection: "row", padding: 10 }}>
//               <Image
//                 source={{ uri: item.artworkUrl100 }}
//                 style={{ width: 50, height: 50 }}
//               />
//               <View style={styles.textContainer}>
//                 <Text style={styles.text1}>{item.trackName}</Text>
//                 <View style={styles.textView}>
//                   <Text style={styles.text2}>{item.artistName}</Text>
//                   <Text style={styles.text3}>
//                     {" "}
//                     {item.collectionName ? "\u2022 " : ""} {item.collectionName}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#111111",
//   },

//   textContainer: {
//     marginLeft: 1,
//     color: "white",
//   },
//   text1: {
//     color: "white",
//     marginLeft: 8,
//   },
//   text2: {
//     color: "white",
//     marginLeft: 8,
//     fontSize: 12,
//   },
//   text3: {
//     color: "white",
//     marginLeft: 8,
//     fontSize: 12,
//     width: "80%",
//   },
//   textView: {
//     flexDirection: "row",
//   },
// });
