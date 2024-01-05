const {
    getAllBlogs: getAllBlogsService,
    createBlog: createBlogService,
    updateBlog: updateBlogService,
    getById: getByIdService,
    deleteBlog: deleteBlogService,
    getByUserId: getByUserIdService
} = require('../service/Blog-service')
const getAllBlogs = async (req, res) => {
    const result = await getAllBlogsService(req)
    if (result.success) {
        return res.status(200).json({ blogs: result.blogs })
    } else {
        return res.status(200).json({ message: result.message })

    }
}
const createBlog = async (req, res) => {
    const result = await createBlogService(req)
    if (result.success) {
        return res.status(200).json({ blog: result.blog })
    } else {
        return res.status(200).json({ message: result.message })

    } 
    
}
const updateBlog = async (req, res) => {
    const result = await updateBlogService(req)
    if (result.success) {
        return res.status(200).json({ blog: result.blog })
    } else {
        return res.status(200).json({ message: result.message })

    } 
}

const getById = async (req, res) => {
    const result = await getByIdService(req)
    if (result.success) {
        return res.status(200).json({ blog: result.blog })
    } else {
        return res.status(200).json({ message: result.message })

    } 
}
const deleteBlog = async (req, res) => {
    const result = await deleteBlogService(req)
    if (result.success) {
        return res.status(200).json({ blog: result.blog })
    } else {
        return res.status(200).json({ message: result.message })

    } 
    return res.status(200).json({ message: "The Blog is removed successfully" });
};
const getByUserId = async (req, res) => {
    const result = await getByUserIdService(req)
    if (result.success) {
        return res.status(200).json({ userBlog: result.userBlog })
    } else {
        return res.status(200).json({ message: result.message })

    } 
};

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    getById,
    deleteBlog,
    getByUserId
}

