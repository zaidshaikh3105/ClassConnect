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
    <div className="w-full py-8 mt-4 text-center">
      {loading ? (
        <p className="text-lg">Loading posts...</p> // Loading state
      ) : error ? (
        <p className="text-red-600">{error}</p> // Error state
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {posts.map((post) => (
            <NotesCard key={post.$id} {...post} />
          ))}
        </div>
      ) : (
        <p>No posts available.</p> // Message for no posts
      )}
    </div>
  );
}

export default AllPost;
