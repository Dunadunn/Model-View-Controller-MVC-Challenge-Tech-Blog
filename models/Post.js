module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      // Define fields here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // ... Add other fields as necessary
    });
  
    // Define associations here. For instance, a post might belong to a user.
    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        });
        Post.hasMany(models.Comment, {
            onDelete: "cascade",
        });
    };
     
  
    return Post;
  };
  