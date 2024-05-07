import React, { useEffect, useState } from "react";
import storageService from "../services/storage";
import { Container } from "../components";
import authSlice from "../store/slices/authSlice";
import { useSelector } from "@reduxjs/toolkit";

function Home() {
  const [posts, setPosts] = useState([]);
  const isLogged = useSelector((state) => state.auth.status);

  useEffect(() => {
    const posts = storageService.getAllDocuments().then((post) => {
      setPosts(post);
    });
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl hover:text-gray-500 font-bold">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>
                })}
            </div>
        </Container>
    </div>
  );
}

export default Home;
