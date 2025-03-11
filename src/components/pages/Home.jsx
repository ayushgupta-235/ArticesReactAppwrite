import React from 'react'
import appwriteService from '../../appwrite/appwriteConfig'
import { useEffect,useState } from 'react'
import Container from '../Container/Container'
import PostCard from '../PostCard'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => { 
        appwriteService.getPosts().then((post) => {
            if(post){
                setPosts(post.documents)
            }
        })
    },[])
    
    if(posts.length === 0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <p className='text-center text-gray-500 col-span-full'>No posts available</p>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {posts.map((post) => <PostCard key={post.$id} post={post} />)}
                </div>
            </Container>
        </div>
    )
}

export default Home
