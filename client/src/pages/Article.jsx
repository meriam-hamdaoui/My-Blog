import React from "react";
import { useParams } from "react-router-dom";
// content
import { articles as articleContent } from "../content/article-content";

const Article = () => {
  const { name } = useParams();
  // find the article by name
  let article = articleContent.find((el) => el.name === name);

  if (!article)
    return (
      <h1 className="sm:text-2xl text-lg font-bold my-6 text-amber-600 text-center">
        Article does not exist
      </h1>
    );

  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {article.content.map((el, index) => (
        <p key={index} className="mx-auto leading-relaxed text-base mb-4">
          {el}
        </p>
      ))}
    </div>
  );
};

export default Article;
