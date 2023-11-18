import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCard: null,
  loading: false,
  error: false,
};

export const cardSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    profilefetchStart: (state) => {
      state.loading = true;
    },
    profilefetchSuccess: (state, action) => {
      state.loading = false;
      state.currentCard = action.payload;
    },
    profilefetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    profilefetchcclear: (state) => {
      state.loading = false;
      state.currentCard = null;
    },
  },
});

export const {
  profilefetchStart,
  profilefetchSuccess,
  profilefetchFailure,
  profilefetchcclear,
} = cardSlice.actions;

export default cardSlice.reducer;
