const express = require('express')
const{getAllBlogs,createBlog,updateBlog,getById,deleteBlog, getByUserId} = require('../controllers/Blog-controller')
const Blogrouter = express.Router()

Blogrouter.get('/',getAllBlogs).get('/:id',getById).get('/user/:id',getByUserId)
Blogrouter.post('/add',createBlog)
Blogrouter.put('/update/:id',updateBlog)
Blogrouter.delete('/delete/:id',deleteBlog)





module.exports = Blogrouter