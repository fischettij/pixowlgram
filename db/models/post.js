const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'user' });
    }
  }
  Post.init(
    {
      description: DataTypes.STRING,
      imageLocation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
      order: [['createdAt', 'DESC']],
    },
  );
  return Post;
};
