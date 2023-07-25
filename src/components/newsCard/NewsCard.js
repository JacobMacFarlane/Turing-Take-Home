import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './NewsCard.css'

const NewsCard = ({ article }) => {
    let dateFormat = article.publishedAt.split('T')
    return (
        <div className="card-cont">
            <NavLink to={`/news/${article.title}`}>
                <img
                    className="card-img"
                    src={article.urlToImage}
                    height={200} width={200}
                />
            </NavLink>
            <div>
                <span><p>{article.title}</p><p>{dateFormat[0]}</p></span>
                <p>{article.description}</p>
            </div>
        </div>
    )
}

export default NewsCard;