import { useState, useCallback } from "react";
import "@/App.css";
import Invitation from "./components/Invitation";
import Preloader from "./components/Preloader";
import CursorTrail from "./components/CursorTrail";

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <CursorTrail />
      <Invitation />
      {!ready && <Preloader onDone={onDone} />}
    </>
  );
}
