import React from "react";
import appwriteService from "../appwrite/appwriteConfig.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      <Link to={`/post/${$id}`}>
        {/* Image Section */}
        <div className="h-52 w-full overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
