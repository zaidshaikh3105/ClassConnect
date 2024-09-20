import { useState, useEffect } from "react";
import "daisyui/dist/full.css"; // Import DaisyUI styles
import service from "../appwrite/config";
import { NotesCard, Container } from "../components/index";

const Home = () => {
  const [posts, setPosts] = useState([]); // Changed to setPosts for consistency

  useEffect(() => {
    // Fetch all posts
    service.getAllNotes().then((response) => {
      if (response) {
        setPosts(response.documents); // Correctly update state with fetched posts
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <Container>
        <div>
          <h1>Login to read posts</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2">
            <NotesCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
