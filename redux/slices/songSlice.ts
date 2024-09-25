import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface SongState {
  selectedSong: Song | null;
  songList: Song[];
}

const initialState: SongState = {
  selectedSong: null,
  songList: [],
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongList: (state, action: PayloadAction<Song[]>) => {
      state.songList = action.payload;
    },
    setSelectedSong: (state, action: PayloadAction<Song>) => {
      state.selectedSong = action.payload;
    },
    clearSelectedSong: (state) => {
      state.selectedSong = null;
    },
  },
});

export const { setSongList, setSelectedSong, clearSelectedSong } =
  songSlice.actions;

export default songSlice.reducer;
