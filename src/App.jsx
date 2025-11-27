/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../Appwrite.js";

import {  getTrendingMovies } from "../Appwrite.js";
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

  const [searchTerm,setsearchTerm]=useState("");
  const [movieList,setmovieList]=useState([]);
  const [errorMessage,seterrorMessage]=useState("");
  const [isLoading,setisLoading] = useState(false);
  const [debouncedsearchTerm,setdebouncedsearchTerm]=useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);


  useDebounce(()=>setdebouncedsearchTerm(searchTerm),500,[searchTerm])

  const fetchmovie=async (query = " ")=>{
    setisLoading(true)
    try {
      const endpoint =query 
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
 
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
         throw new Error("Failed to fetch movie")     
        }
      const data = await response.json();
      if(data.response == "false"){
        seterrorMessage(data.Error || "Failed to fetch data");
        setmovieList([]);
        return;
      }
      setmovieList(data.results)
     // updateSearchCount();
      console.log(data); 
         if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      } 
    } catch (error) {
      console.error(`Error is ${error}`)
    }finally{
      setisLoading(false)
    }

  }
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchmovie(debouncedsearchTerm);
  }, [debouncedsearchTerm]);
   useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern"/>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner"/>
            <h1>Find <span className="text-gradient">movies</span> You'll will enjoy Without Hassle.</h1>
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>

            </header>
             {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>all movie</h2>
          {
            isLoading?(<Spinner></Spinner>):
            errorMessage?(<p className="text-red-500">{errorMessage}</p>):
            (
            <ul>
            {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
          </ul>
     
          )
          }
          </section>    
        </div>
      
    </main>
  )
}

export default App