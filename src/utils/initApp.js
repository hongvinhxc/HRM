const User = require('../models/user.model');
const logger = require('./logger');

const initApp = async () => {
    let hasAccount = await User.countDocuments()
    if (!hasAccount) {
        logger.info('Create account admin');
        User.create({
            username: "administrator",
            password: "123456aA@"
        })
    }
} 

module.exports = { 
    initApp,
}