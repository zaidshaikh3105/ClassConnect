import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = note && userData ? note.userId === userData.$id : false;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (slug) {
          const fetchedNote = await service.getNote(slug);
          if (fetchedNote) setNote(fetchedNote);
          else navigate("/");
        } else navigate("/");
      } catch (err) {
        setError("Failed to fetch note. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNote();
  }, [slug, navigate]);

  const deleteNote = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmed) {
      try {
        const status = await service.deleteNotes(note.$id);
        if (status) {
          await service.deleteFile(note.image);
          navigate("/");
        }
      } catch (err) {
        setError("Failed to delete the note. Please try again later.");
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading indicator
  }

  return error ? (
    <div className="text-red-600 text-center">{error}</div> // Display error message
  ) : note ? (
    <div className="py-8 bg-base-100">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-center items-center mb-8 relative border border-base-300 rounded-xl p-6 bg-base-100 shadow-md">
          <img
            src={service.getFilePreview(note.image)}
            alt={note.title}
            onError={(e) => {
              e.target.onerror = null; // Prevent looping
              e.target.src = "path/to/fallback-image.jpg"; // Fallback image
            }}
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
          <h1 className="text-3xl font-bold text-white">{note.title}</h1>
        </div>
        <div className="prose max-w-none prose-headings:text-primary  prose-img:rounded-xl">
          {parse(note.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
