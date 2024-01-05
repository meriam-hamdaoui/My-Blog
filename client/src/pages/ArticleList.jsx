import React from "react";
//
import articles from "../content/article-content";
import Articles from "../components/Articles";

const ArticleList = () => {
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Article List
      </h1>
      <Articles articles={articles} />
    </div>
  );
};

export default ArticleList;
