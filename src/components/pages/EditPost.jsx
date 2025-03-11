import React from 'react'
import PostForm from '../post-form/PostForm'
import Container from '../Container/Container'  
import { useEffect,useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import appwriteService from '../../appwrite/appwriteConfig'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams() // Get slug from URL and uses it as id
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
    
  return (
    <div className='py-8'>
      <Container>
        {post && <PostForm post={post} />} 
        </Container>
      
    </div>
  )
}

export default EditPost
