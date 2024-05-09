import React, { useEffect, useState } from 'react'
import storageService from '../services/storage'
import { Container, PostCard } from '../components'

function AllPostsPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        storageService.getAllDocuments([]).then((post)=>{
            setPosts(post)
        })
    }, [])
    
  return (
    posts? (<div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>
                })}
            </div>
        </Container>
    </div>) 
    : <div>no posts</div>
  )
}

export default AllPostsPage