import "./App.css";
import InstallPage from "./pages/InstallPage";
import HomePage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";

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
      <Route path="/step/" element={<InstallPage />} />
    </Routes>
  );
}

export default App;
