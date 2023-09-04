import React, { useState } from 'react'
import { createSearchParams, useNavigate, useLocation } from 'react-router-dom'

const SearchInput = ({ big = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const resetInputField = () => {
    setSearchQuery("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    navigate({ pathname: "/search", search: `?${createSearchParams({ query: searchQuery })}` })
    resetInputField();
  }


  return (
    <div className={big ? "SearchWrap-big" : "SearchWrap"}>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchInput"
          value={searchQuery}
          onChange={handleChange}
          type="text"
          placeholder="Sök här efter alkodryck"
        />
      </form>
    </div>
  )
}

export default SearchInput;