import React from "react";
import ArticleCard from "./ArticleCard";
const Articles = ({ articles }) => {
  return (
    <div className="container py-4 mx-auto">
      <div className="flex flex-wrap -m-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
