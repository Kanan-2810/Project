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
    if (!blogs) {
        res.status(404).json({ message: "Blogs are not found" })
    }
    return res.status(200).json(blogs)
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
        return res.status(404).json({ messgae: "Unable to find User using this Id " })
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
        res.status(500).json({ messgae: error })
    }
    return res.status(200).json({ blog })
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
        return res.status(404).json({ message: "blog is not present which you are looking for" })
    }
    return res.status(200).json({ blog })

}

const getById = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findById(id)

    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        res.status(404).json({ message: "Blog is not present " })
    }
    res.status(200).json({ blog })

}
const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {

        blog = await Blog.findById(id).populate("user");

        if (!blog) {
            return res.status(404).json({ message: "Blog is not present in the DB" });
        }
        const user = blog.user;
        user.blogs.pull(blog);
        await user.save();
        await Blog.deleteOne({ _id: id });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ message: "The Blog is removed successfully" });
};
const getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate("blogs")
    } catch (error) {
        return console.log(error);
    }
    if (!userBlog) {
        return res.status(404).json({ message: "the blog is not found" })
    }
    return res.status(200).json({ blogs: userBlog })
};

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    getById,
    deleteBlog,
    getByUserId
}

