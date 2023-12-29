const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req) => {
    const cre = await req
    console.log("cre", cre)
    if (!cre.username || !cre.password) {
        throw new BadRequestError('Please provide email and password')
    }


    const username = cre.username
    const id = new Date().getDate()
    console.log("hsd")
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    return token
}
const dashboard = async (req) => {
    const luckyNumber = await Math.floor(Math.random() * 100)
    return luckyNumber;
}
module.exports =
{
    login,
    dashboard,
}