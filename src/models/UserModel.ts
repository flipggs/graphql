import {
  Instance,
  Model,
  Sequelize,
  DataTypes,
  CreateOptions,
} from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAttributes {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updateddAt?: string;
}

export interface UserInstance extends Instance<UserAttributes>, UserAttributes {
  isPassword(encondedPassword: string, password: string): boolean;
}

export interface UserModel
  extends BaseModelInterface,
    Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize, DataTypes: DataTypes): UserModel => {
  const User: UserModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      photo: {
        type: DataTypes.BLOB({
          length: "long",
        }),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "users",
      hooks: {
        beforeCreate: (user: UserInstance, options: CreateOptions) => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        },
        beforeUpdate: (user: UserInstance, options: CreateOptions) => {
          if (user.changed("password")) {
            const salt = genSaltSync();
            user.password = hashSync(user.password, salt);
          }
        },
      },
    }
  );

  User.associate = (models: ModelsInterface): void => {};

  User.prototype.isPassword = (
    encondedPassword: string,
    password: string
  ): boolean => {
    return compareSync(password, encondedPassword);
  };

  return User;
};