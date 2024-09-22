import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { NotesCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await service.getAllNotes();
      if (response && response.documents) {
        setPosts(response.documents);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 mt-4 text-center">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white">No Notes Available</h1>
          <p className="mt-2 text-lg">
            It looks like there are no notes to display.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {posts.map((post) => (
            <NotesCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
