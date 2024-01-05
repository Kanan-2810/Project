const User = require('../models/user');
const Blog = require('../models/Blog');
const mongoose = require('mongoose')

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();

    } catch (error) {
        return console.log(error);
    }
    if (!blogs || blogs.length === 0) {
        return { status: false, message: "Blogs are not found" }
    }
    else {
        return { status: true, blogs };

    }
}

const createBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return {status:false ,messgae: "Unable to find User using this Id "}
    }
    const blog = new Blog({
        title, description, image, user,
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction();
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        session.commitTransaction()
    } catch (error) {
        console.log(error);
        return {status: false , messgae: error }
    }
    return {status:true ,blog};
}

const updateBlog = async (req, res, next) => {
    const { title, description } = req.body
    const Blog_id = req.params.id
    let blog

    try {
        blog = await Blog.findByIdAndUpdate(Blog_id, {
            title, description
        })
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return { status : false ,message: "blog is not present which you are looking for..." }
    }
    return {status:true ,blog};
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {

        blog = await Blog.findById(id).populate("user");

        if (!blog) {
            return { status : false ,message: "Blog is not present in the DB" }
        }
        const user = blog.user;
        user.blogs.pull(blog);
        await user.save();
        await Blog.deleteOne({ _id: id });

    } catch (error) {
        console.log(error);
        return {status : false , message: "Internal Server Error" };
    }
    return {status:true ,blog};
}
 
const getById = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findById(id)

    } catch (error) {
         console.log(error);
    }
    if (!blog) {
       return { status : false , message: "Blog is not present " }
    }
    return {status:true ,blog};
}
const getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate("blogs")
    } catch (error) {
         console.log(error);
    }
    if (!userBlog) {
        return {status:false ,  message: "the blog is not found" }
    }
    return {status:true ,userBlog};
}

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    getById,
    deleteBlog,
    getByUserId
}
