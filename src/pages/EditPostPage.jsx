import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import storageService from "../services/storage";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      storageService.getOneDocument(slug).then((post) => {
        setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <div>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPostPage;
