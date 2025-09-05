import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@/models/client";
import { CLIENTS as initialClients } from "@/data/clients";

// Type for creating a new client WITHOUT id (id is assigned by Redux)
type NewClient = Omit<Client, "id">;

// Initial state of the slice
interface ClientsState {
  list: Client[];
}

const initialState: ClientsState = {
  list: initialClients, // start with the clients in data/clients.ts
};

// Slice definition
const clientsSlice = createSlice({
  name: "clients", // slice name
  initialState,
  reducers: {
    // Action to add a client
    addClient: (state, action: PayloadAction<NewClient>) => {
      // calculate the next id
      const nextId =
        state.list.length > 0
          ? Math.max(...state.list.map((c) => c.id)) + 1
          : 1;
      // add the new client to the state's array
      state.list.push({ id: nextId, ...action.payload });
    },
  },
});

export const { addClient } = clientsSlice.actions;
export default clientsSlice.reducer;
