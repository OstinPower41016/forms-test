import { configureStore } from "@reduxjs/toolkit";

import formReducers from "./form/formSlice";

const store = configureStore({
  reducer: {
    form: formReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
