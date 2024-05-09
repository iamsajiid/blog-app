import React, { useEffect, useState } from "react";
import storageService from "../services/storage";
import { Container, PostCard } from "../components";
import { useSelector} from "react-redux"

function Home() {
  const [posts, setPosts] = useState([]);
  const isLogged = useSelector((state) => state.auth.status);

  useEffect(() => {
    storageService.getAllDocuments([]).then((post) => {
      setPosts(post.documents);
    });
  }, [posts]);

  if (posts.length !== 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => {
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>;
            })}
          </div>
        </Container>
      </div>
    );
  }

  if(!isLogged){
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">
                Login to read
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold">
              No posts to read
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
