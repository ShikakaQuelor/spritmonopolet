import React from "react";
import SearchInput from "../components/SearchInput";

function Home() {
  return (
    <div className="home-wrapper wrapper">
      <div className="welcome-text">
        <p>Välkommen</p>
      </div>

      <div>
        <SearchInput />
      </div>
      <div className="welcome-info">
        <p>
          Sök efter en alkodryck i Systembolagets sortiment för att se hur stor
          andel av priset som är skatt
        </p>
      </div>
    </div>
  );
}

export default Home;
