/* eslint-disable no-unused-vars */
import React from 'react'

const Search = ({SearchItem,setSearchItem}) => {
  return (
    <div className='search'>
        <div>
        <img src='search.svg' alt='search image'/>
        <input type='text' placeholder='Search Movie' value={SearchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
      </div>
    </div>
  )
}

export default Search
