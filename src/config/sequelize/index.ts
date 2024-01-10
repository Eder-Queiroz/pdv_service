import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE || "database",
  process.env.DATABASE_USER || "user",
  process.env.DATABASE_PASSWORD || "password",
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexão com o banco realizada com sucesso!.");
  } catch (error) {
    console.error("Erro ao tentar se connectar com o banco:", error);
  }
};

export { sequelize, connect };
