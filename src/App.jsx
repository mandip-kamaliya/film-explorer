/* eslint-disable no-unused-vars */
import { useState } from "react"
import Search from "./components/Search.jsx"
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method:"GET",
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
function App() {

  const [SearchItem,setSearchItem]=useState("");
  const [movieList,setmovieList]=useState([]);
  const [errorMessage,seterrorMessage]=useState("");
  const [isLoading,setisLoading] = useState(false);

  const fetchmovie=async ()=>{
    try {
      const endpoint=`${API_KEY}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
         throw new Error("Failed to fetch movie")     
        }
      const data = await response.json();
      console.log(data);  
    } catch (error) {
      console.log(`Error is ${errorMessage}`)
    }

  }
  return (
    <main>
      <div className="pattern"/>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner"/>
            <h1>Find <span className="text-gradient">movies</span> You'll will enjoy Without Hassle.</h1>
            <Search SearchItem={SearchItem} setSearchItem={setSearchItem}/>

            </header>
        </div>
      
    </main>
  )
}

export default App