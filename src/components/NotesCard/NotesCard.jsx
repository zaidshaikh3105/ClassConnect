import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const NotesCard = ({ $id, title, image }) => {
  return (
    <Link
      to={`/post/${$id}`}
      className="hover:scale-105 transition-transform duration-300"
    >
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <figure className="relative">
          <img
            src={service.getFilePreview(image)}
            alt={title}
            className="object-cover w-full h-48 rounded-t-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">{title}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View Post</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotesCard;
