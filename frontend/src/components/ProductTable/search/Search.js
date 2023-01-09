import React from 'react'

const Search = ({filter,setGlobalFilter}) => {
  return (
    <div>
        <input className="product-table-search"
        value={filter}
        placeholder="Search Category..."
        onChange={(e)=>setGlobalFilter(e.target.value)}/>
    </div>
  )
}

export default Search