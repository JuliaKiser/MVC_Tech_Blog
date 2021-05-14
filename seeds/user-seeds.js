const { User } = require('../models');

const UserData = [
    {
        username: 'Test User 1',
        email: 'testuser1@test.com',
        password: 'testtest'
    },
    {
        username: 'Test User 2',
        email: 'testuser2@test.com',
        password: 'testtest',
    },
    {
        username: 'Test User 3',
        email: 'testuser3@test.com',
        password: 'testtest',
    }
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;