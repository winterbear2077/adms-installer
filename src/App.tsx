import "./App.css";
import InstallPage from "./pages/InstallPage";
import HomePage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const cards = [
    {
      title: "1",
      description: "Description for Card 1",
      barcolor: "#6C9BEF",
    },
    {
      title: "2",
      description: "Description for Card 2",
      barcolor: "#82C8A3",
    },
    {
      title: "3",
      description: "Description for Card 3",
      barcolor: "#F0C987",
    },
    {
      title: "4",
      description: "Description for Card 4",
      barcolor: "#D4A5A5",
    },
  ]


  return (
    <Routes>
      <Route path="/" element={<HomePage cards={cards} />} />
      <Route path="/step/" element={<InstallPage />} />
    </Routes>
  );
}

export default App;
