const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/connection.js');  // Adjust path if necessary
const DataTypes = Sequelize.DataTypes;

const UserModel = require('./User');
const PostModel = require('./Post');
const CommentModel = require('./Comment');

const User = UserModel(sequelizeConfig, DataTypes);
const Post = PostModel(sequelizeConfig, DataTypes);
const Comment = CommentModel(sequelizeConfig, DataTypes);

// Here, you can set the associations between the models if needed.
User.associate({ Post, Comment });
Post.associate({ User, Comment });
Comment.associate({ User, Post });

module.exports = {
    User,
    Post,
    Comment
};
