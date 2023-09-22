module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      // Define fields here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // ... Add other fields as necessary
    });
  
    // Define associations here. For instance, a comment might belong to both a user and a post.
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        });
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
            }
        });
    };
    
  
    return Comment;
  };
  