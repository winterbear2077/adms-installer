import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import HomePage from "./pages/MainPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SPage from "./components/SideStepper";

function App() {
  const cards = [
    {
      title: "1",
      description: "Description for Card 1",
      barcolor: "#FF5733",
    },
    {
      title: "2",
      description: "Description for Card 2",
      barcolor: "#33FF57",
    },
    {
      title: "3",
      description: "Description for Card 3",
      barcolor: "#3357FF",
    },
    {
      title: "4",
      description: "Description for Card 4",
      barcolor: "#F1C40F",
    },
  ]


  return (
    <Routes>
      <Route path="/" element={<HomePage cards={cards} />} />
      <Route path="/step/" element={<SPage />} />
    </Routes>
  );
}

export default App;
