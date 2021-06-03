import React, { useEffect, useReducer } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import spinner from "../logo.svg"
import Product from '../components/Product'
import { initialState, reducer } from "../store/Reducer"
import SearchInput from '../components/SearchInput'

const URL = "https://skatt.herrborgstrom.se/products/"
const VAR = "https://skatt.herrborgstrom.se/variables"

const SearchResults = (props) => {
  const { search } = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const parsed = queryString.parse(search);
  const limit = 30;


  useEffect(() => {
    axios.get(VAR).then(res => {
      dispatch({
        type: "SET_VAR",
        payload: res.data
      })
      console.log(res)
    })
    axios.get(URL + parsed.query).then(res => {
      dispatch({
        type: "SEARCH_SUCCESS",
        payload: res.data.products
      })
    })
  }, [search]);

  const { products, errorMessage, loading } = state;

  const retrievedProducts =
    loading && !errorMessage ? (
      <img classname="spinner" src={spinner} />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      products.slice(0, limit ? limit : products.legnth).map((product, index) => (
        <Product key={index} product={product} />
      ))
    );



  return (
    <div className="searchResults-wrapper wrapper">
      <SearchInput big={false} />
      <div className="SearchResults">
        {retrievedProducts}
      </div>
    </div>
  )
}

export default SearchResults

