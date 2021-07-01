const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

// this creates the comment model
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_content: {
      type: Datatypes.STRING,
      validate: {
        len: [3],
      },
    },
    user_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);
model.exports = Comment;
