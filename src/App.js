import "./App.css";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path=":searchQuery" component={SearchResults} />
    </Router>
  );
}

export default App;
