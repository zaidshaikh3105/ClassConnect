import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [note, setnote] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = note && userData ? note.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getNote(slug).then((note) => {
        if (note) setnote(note);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deleteNote = () => {
    service.deleteNotes(note.$id).then((status) => {
      if (status) {
        service.deleteFile(note.image);
        navigate("/");
      }
    });
  };

  return note ? (
    <div className="py-8 bg-base-100">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-center items-center mb-8 relative border border-base-300 rounded-xl p-6 bg-base-100 shadow-md">
          <img
            src={service.getFilePreview(note.image)}
            alt={note.title}
            className="rounded-xl max-w-full md:max-w-md"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-2">
              <Link to={`/edit-post/${note.$id}`}>
                <Button className="bg-green-500 hover:bg-green-600">
                  Edit
                </Button>
              </Link>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={deleteNote}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">{note.title}</h1>
        </div>
        <div className="prose max-w-none prose-headings:text-primary prose-img:rounded-xl">
          {parse(note.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
