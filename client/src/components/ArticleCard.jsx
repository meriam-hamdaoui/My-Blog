import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="p-4 md:w-1/2">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Link to={`/article/${article.name}`}>
          <div className="relative">
            <img
              src={article.thumbnail}
              alt="Article_image"
              class="lg:h-60 md:h-52 w-full object-cover object-center rounded-md shadow-md"
            />
            {/* w-48 h-60 lg:h-52 xl:h-60 object-cover rounded-md shadow-md */}
            <div class="bg-gradient-to-t from-gray-800 via-transparent absolute inset-0 rounded-md"></div>
            <div class="absolute bottom-2 left-3 text-white text-md leading-relaxed">
              <p class="font-medium mb-3">{article.title.toUpperCase()}</p>
              <p className="text-sm">
                {article.content[0].substring(0, 50)}...
              </p>
              <div className="flex justify-end flex-wrap text-violet-200 text-center md:mb-2 lg:mb-4 pr-4">
                Learn More
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
