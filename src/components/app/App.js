import Main from "../main/Main";
import Search from "../search/Search";
import Header from "../header/Header";
import Error from "../error/Error";
import SingleNews from "../singleNews/SingleNews";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { data } from "/Users/thamoops/take-home/turing-take-home/src/mockData.js";
import { fetchAllArticles } from "../../apiCalls";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [error, setError] = useState("");
  const [storedArticles, setStoredArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const data = await fetchAllArticles()
      setArticles(data.articles)
      setTotalArticles(data.totalResults);
    } catch (error) {
      setError("fetch")
    }
  };
console.log(articles.length)
  const searchResults = (searchValue) => {
    setStoredArticles(articles);
    let lowerSearchValue = searchValue.toLowerCase();
    let nameSearchResults = articles.filter((article) => {
      return (
        article.author?.toLowerCase().includes(lowerSearchValue) ||
        article.title?.toLowerCase().includes(lowerSearchValue) ||
        article.description?.toLowerCase().includes(lowerSearchValue)
      );
    });
  
    console.log(nameSearchResults, 'important');
    
    if (!nameSearchResults.length) {
      setError("search");
    } else {
      setArticles(nameSearchResults);
    }
  };

  const resestResults = (event) => {
    setError('')
    event.preventDefault();
    setArticles(storedArticles)
  }
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Search articles={articles} search={searchResults} reset={resestResults} />
              {error === "" ? ( <Main articles={articles} />) : error === "fetch" ? (<Error message={"fetch"} />) : (<Error message={"search"} />)}
            </div>
          }/>
          <Route path="/news/:title" element={<SingleNews articles={articles} />} />
          <Route path="*" element={
            <Error message={"url"} />
          } />
      </Routes>
    </div>
  );
}

export default App;
