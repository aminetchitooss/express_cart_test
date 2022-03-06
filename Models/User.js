const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    orders: {
      type: DataTypes.ARRAY(
        DataTypes.JSON({
          product: {
            type: DataTypes.ABSTRACT({
              id: {
                type: DataTypes.NUMBER,
              },
              name: {
                type: DataTypes.STRING,
              },
              price: {
                type: DataTypes.NUMBER,
              },
            }),
          },
          quantity: {
            type: DataTypes.NUMBER,
          },
        })
      ),
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
