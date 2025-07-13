import { useState } from "react"
import Search from "./components/Search.jsx"
function App() {

  const [SearchItem,setSearchItem]=useState("");
  return (
    <main>
      <div className="pattern"/>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner"/>
            <h1>Find <span className="text-gradient">movies</span> you will enjoy Without Hassle.</h1>
            <Search SearchItem={SearchItem} setSearchItem={setSearchItem}/>

            </header>
        </div>
      
    </main>
  )
}

export default App