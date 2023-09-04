import "./App.scss";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Footer from "./components/Footer";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/about" exact element={<About />} />
    </Routes>
  );
}

export default App;
