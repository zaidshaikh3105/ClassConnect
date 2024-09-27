import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const NotesCard = ({ $id, title, image }) => {
  return (
    <Link
      to={`/post/${$id}`}
      className="hover:scale-105 transition-transform duration-300"
    >
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full w-80 h-80 ">
        <figure className="h-auto w-full">
          <img
            src={service.getFilePreview(image)}
            alt={title}
            // className="object-cover h-full w-full rounded-t-lg"
          />
        </figure>
        <div className="card-body flex-grow flex flex-col justify-between">
          <h2 className="card-title text-lg font-bold  text-white">{title}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black focus:ring focus:ring-white">
              View Post
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotesCard;
