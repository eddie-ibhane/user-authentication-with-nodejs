import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {type: String},
        message: {type: String},
        user: {type: String}
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post