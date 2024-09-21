import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, NotesCard } from "../components/index";

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
          return;
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
    <div className="w-full py-8">
      <Container>
        {loading ? (
          <p>Loading posts...</p> // Loading state
        ) : error ? (
          <p className="text-red-600">{error}</p> // Error state
        ) : (
          <div className="flex flex-wrap">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.$id}>
                  <NotesCard
                    $id={post.$id}
                    title={post.title}
                    image={post.image}
                  />
                </div>
              ))
            ) : (
              <p>No posts available.</p> // Message for no posts
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
