import Post from '../Model/postModel.js'

// desc: Create a post
// route: Post /api/posts
// @access: public

const createPost = async(req, res) => {
    try {
        const {title, message, user} = req.body
        const newPost = await new Post({
            title,
            message,
            user
        })
        const savePost = await newPost.save()
        if(savePost){
            res.json({status: true, message: "post created", savePost})
        }else{
            res.status(400).json({status: false, message: "Post not created"})
        }
    } catch (error) {
        throw new Error(error)
    }
}

const fetchPosts = async(req, res) => {
    try {
        const posts = await Post.find({})
        if(posts){
            res.json({status: true, message: "Posts retrieved", posts})
        }else{
            res.json(400).json({status: false, message: "Unable to fetch all posts"})
        }
    } catch (error) {
        throw new Error(error)
    }
}

export {createPost, fetchPosts}