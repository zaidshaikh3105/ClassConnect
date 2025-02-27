import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import service from "../appwrite/config";
import { Button, Container } from "../components";

export default function Post() {
  const [note, setNote] = useState(null);
  const [status, setStatus] = useState({
    loading: true,
    error: "",
  });

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchNote = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const fetchedNote = await service.getNote(slug);
        if (fetchedNote) {
          setNote(fetchedNote);
        } else {
          navigate("/");
        }
      } catch (err) {
        setStatus((prev) => ({
          ...prev,
          error: "Failed to fetch note. Please try again later.",
        }));
      } finally {
        setStatus((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };

    fetchNote();
  }, [slug, navigate]);

  const handleDeleteNote = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setStatus((prev) => ({ ...prev, loading: true }));

    try {
      const status = await service.deleteNotes(note.$id);
      if (status) {
        await service.deleteFile(note.image);
        navigate("/home");
      }
    } catch (err) {
      setStatus((prev) => ({
        loading: false,
        error: "Failed to delete the note. Please try again later.",
      }));
    }
  };

  // Check if the current user is the author
  const isAuthor = note && userData ? note.userId === userData.$id : false;

  if (status.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...{" "}
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{status.error}</span>
        </div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="py-8 bg-base-100 min-h-screen">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Image and actions section */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg bg-base-200">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={service.getFilePreview(note.image)}
                alt={note.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/fallback-image.jpg";
                }}
                className="object-cover w-full h-full"
              />
            </div>

            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-2 z-10">
                <Link to={`/edit-post/${note.$id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 shadow-md transition-all">
                    Edit
                  </Button>
                </Link>
                <Button
                  className="bg-red-500 hover:bg-red-600 shadow-md transition-all"
                  onClick={handleDeleteNote}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title section */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {note.title}
            </h1>
            <div className="text-sm text-gray-500">
              {new Date(note.$createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </header>

          {/* Content section */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-img:rounded-xl prose-a:text-blue-600">
            {parse(note.content)}
          </div>
        </article>
      </Container>
    </div>
  );
}
