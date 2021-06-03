import "./App.scss";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About"
import Footer from "./components/Footer"

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/about" exact component={About} />
      <Footer />
    </Router>
  );
}

export default App;
