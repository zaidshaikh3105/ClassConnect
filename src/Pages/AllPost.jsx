import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { NotesCard } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error handling

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
        setLoading(false); // Set loading to false after the request
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
          {posts.map((post) => (
            <NotesCard key={post.$id} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600 text-lg">No posts available.</p>
        </div>
      )}
    </div>
  );
}

export default AllPost;
