import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Manga from "./pages/Manga";
import Queue from "./pages/Queue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="queue" element={<Queue />} />
          <Route path="logs" element={<Logs />} />
          <Route path="manga" element={<Manga />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
