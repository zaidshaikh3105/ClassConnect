import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

const NotesCard = ({ $id, title, image }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={service.getFilePreview(image)} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotesCard;
