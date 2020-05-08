import { Instance, Model, Sequelize, DataTypes } from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface CommentAttributes {
  id?: number;
  comment?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updateddAt?: string;
}

export interface CommentInstance extends Instance<CommentAttributes>{}

export interface CommentModel extends BaseModelInterface, Model<CommentInstance, CommentAttributes>{}

export default (sequelize:Sequelize, DataTypes: DataTypes): CommentModel=> {
  const Comment: CommentModel = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'comments'
  });
  
  Comment.associate = (models: ModelsInterface):void => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
      }
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
      }
    });
  }

  return Comment;
}