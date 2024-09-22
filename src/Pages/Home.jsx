import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { NotesCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllNotes().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold text-white">
              No Notes Available
            </h1>
            <p className="mt-2 text-lg">
              It looks like there are no notes to display.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <NotesCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
