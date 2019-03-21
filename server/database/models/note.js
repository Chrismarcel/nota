'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Note.associate = function (models) {
    Note.belongsTo(models.User);
  };
  return Note;
};