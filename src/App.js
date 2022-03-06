import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import AllMusicPage from "./pages/AllMusicPage";
import AlbumsPage from "./pages/AlbumsPage";

import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/artists/:id/:name/music" element={<AllMusicPage />} />
      <Route path="/artists/:id/:name/albums" element={<AlbumsPage />} />
    </Routes>
  );
}

export default App;
