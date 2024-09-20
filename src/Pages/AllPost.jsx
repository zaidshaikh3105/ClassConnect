import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, NotesCard } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]); // Correct initialization of state

  useEffect(() => {
    // Fetch all notes from the service
    service.getAllNotes().then((response) => {
      if (response) {
        setPosts(response.documents); // Update state with the fetched posts
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id}>
              <NotesCard post={post} /> {/* Pass individual post data */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
