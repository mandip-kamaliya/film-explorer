/* eslint-disable no-unused-vars */
import React from 'react'

const Search = ({SearchTerm,setsearchTerm}) => {
  return (
    <div className='search'>
        <div>
        <img src='search.svg' alt='search image'/>
        <input type='text' placeholder='Search Movie' value={SearchTerm} onChange={(e)=>setsearchTerm(e.target.value)}/>
      </div>
    </div>
  )
}

export default Search
