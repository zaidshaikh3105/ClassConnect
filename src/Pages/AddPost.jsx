import React from "react";
import { Container, PostNote } from "../components/index";
function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostNote />
      </Container>
    </div>
  );
}

export default AddPost;
