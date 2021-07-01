const { User } = require('../models');

const UserData = [
    {
        username: 'JBreezy10',
        password: 'Superman1'
    },
    {
        username: 'HelBear',
        password: 'Charlotte10'
    },
    {
        username: 'Zrichards',
        password: 'Burgers10'
    }
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;