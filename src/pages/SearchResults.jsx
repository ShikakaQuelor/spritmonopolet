import React, { useEffect, useReducer, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import axios from "axios";
import spinner from "../logo.svg";
import Product from "../components/Product";
import { initialState, reducer } from "../store/Reducer";
import SearchInput from "../components/SearchInput";
import "../styles/searchResults.scss";

const URL = "https://skatt.herrborgstrom.se/products/";
const VAR = "https://skatt.herrborgstrom.se/variables";

const SearchResults = () => {
  const { search } = useLocation()
  const [state, dispatch] = useReducer(reducer, initialState);
  const parsed = queryString.parse(search);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    axios.get(VAR).then((res) => {
      dispatch({
        type: "SET_VAR",
        payload: res.data,
      });
      console.log(res);
    });
  }, []);

  useEffect(() => {
    setLimit(products.length > 10 ? products.length : 10);
    axios.get(URL + parsed.query).then((res) => {
      dispatch({
        type: "SEARCH_SUCCESS",
        payload: res.data.products,
      });
    });
  }, [search]);

  const { products, errorMessage, loading } = state;

  const retrievedProducts =
    loading && !errorMessage ? (
      <img classname="spinner" src={spinner} alt="" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      products
        .slice(0, limit ? limit : products.length)
        .map((product, index) => <Product key={index} product={product} />)
    );

  return (
    <div className="searchResults-wrapper wrapper">
      <SearchInput big={false} />
      <div className="SearchResults">
        <div className="product-wrap">{retrievedProducts}</div>
      </div>
      <div
        className="ShowMoreResults"
        onClick={() =>
          setLimit(limit + 10 < products.length ? limit + 10 : products.length)
        }
      >
        <p>
          Visar {limit ? limit : products.length} av {products.length} totalt
        </p>
        <p>Klicka för att visa mer, eller förfina sökningen</p>
      </div>
    </div>
  );
};

export default SearchResults;
