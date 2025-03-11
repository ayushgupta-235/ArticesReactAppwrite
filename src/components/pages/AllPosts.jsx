import React, { useState, useEffect } from "react"; 
import Container from "../Container/Container"; 
import PostCard from "../PostCard";
import appwriteService from "../../appwrite/appwriteConfig"; 

function AllPosts() {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    //  Fetch posts once when component mounts
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []); // Added empty dependency array to prevent multiple calls

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.$id} post={post} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts available.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
