const bcrypt = require('bcrypt')


// hash password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
        throw error; // Rethrow the error to propagate it
    }
}



// compare password to decrypt password
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}



module.exports = { hashPassword, comparePassword }