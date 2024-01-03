const {
    getAllBlogs: getAllBlogsService,
    createBlog: createBlogService,
    updateBlog: updateBlogService,
    getById: getByIdService,
    deleteBlog: deleteBlogService,
    getByUserId: getByUserIdService
} = require('../service/Blog-service')
const getAllBlogs = async (req, res) => {
    const blogs = await getAllBlogsService(req)

    return res.status(200).json(blogs)
}
const createBlog = async (req, res) => {
    const blog = await createBlogService(req)

    return res.status(200).json({ blog })
}
const updateBlog = async (req, res) => {
    const blog = await updateBlogService(req)
    return res.status(200).json({ blog })

}

const getById = async (req, res) => {
    const blog = await getByIdService(req)
    res.status(200).json({ blog })

}
const deleteBlog = async (req, res) => {
    const blog = await deleteBlogService(req)

    return res.status(200).json({ message: "The Blog is removed successfully" });
};
const getByUserId = async (req, res) => {
    const userBlog = await getByUserIdService(req)
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

