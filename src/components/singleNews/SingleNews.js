import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { data } from "/Users/thamoops/take-home/turing-take-home/src/mockData.js";
import { NavLink } from "react-router-dom";
import { fetchAllArticles } from "../../apiCalls";
const SingleNews = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([])
    const [singularArticle, setSingularArticle] = useState([]);
    let { title } = useParams();

    const fetchSingle = async (newsTitle) => {
        try {
            const data = await fetchAllArticles()
            let thisOne = data.articles.filter((article) => {
                return article.title === newsTitle;
            })
            console.log(thisOne)
            setSingularArticle(thisOne);
          } catch (error) {
            console.log(error)
          }
    };

    useEffect(() => {
        fetchSingle(title);
        setLoading(false);
    }, [title]);

    return (
        <div>
            {loading === true ? (
                <p>loading....</p>
            ) : singularArticle.length > 0 ? (
                <>
                    <div>
                        <h2>{singularArticle[0].title}</h2>
                        <p>{singularArticle[0].publishedAt}</p>
                        <p>Source: {singularArticle[0].source.name}</p>
                    </div>
                    <div>
                        <img src={singularArticle[0].urlToImage} height={200} width={200} />
                        <p>{singularArticle[0].content}</p>
                    </div>
                </>
            ) : (
                <p>No article found with the given title.</p>
            )}
            <NavLink to='/'><button>Home</button></NavLink>
        </div>
    );
};

export default SingleNews;