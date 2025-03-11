import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/appwriteConfig'
import Container from '../Container/Container'
import Button from '../Button'
import parse from 'html-react-parser'

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData) 

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) setPost(post)
                })
                .catch((error) => console.error("Error fetching post:", error))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        if (!post) return
        appwriteService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteService.deletePost(post.featuredImage)
                    navigate('/')
                }
            })
            .catch((error) => console.error("Error deleting post:", error))
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}
