import { User } from "../../model/user";
import { UserType } from "./type";

const createUser = async (user: UserType) => User.create(user);
const getName = async (name: string) => User.findOne({ where: { name } });
const findUserById = async (id: number) =>
  User.findOne({ where: { id }, attributes: { exclude: ["password", "id"] } });

export { createUser, getName, findUserById };
