import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //this is the local storage by default
import notesReducer from "./feature/notesSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Creating a persisted reducer
const persistedReducer = persistReducer(persistConfig, notesReducer);

// Configure store with the persisted reducer
export const store = configureStore({
  reducer: {
    notes: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Create a persistor for use with PersistGate
export const persistor = persistStore(store);
