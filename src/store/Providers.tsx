"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// Client Component que envuelve la app con Redux
export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
