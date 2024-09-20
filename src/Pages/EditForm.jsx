import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostNote } from "../components/index";
import { useParams, useNavigate } from "react-router-dom";

function EditForm() {
  const [post, setposts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getNote(slug).then((post) => {
        if (post) {
          setposts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="p-8">
      <Container>
        <PostNote post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditForm;
