import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { NotesCard } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.getAllNotes();
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setError("No posts found.");
        }
      } catch (er) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">No Notes Available</h1>
          <p className="mt-2 text-lg">
            It looks like there are no posts to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {posts.map((post) => (
        <NotesCard key={post.$id} {...post} />
      ))}
    </div>
  );
}

export default AllPost;
