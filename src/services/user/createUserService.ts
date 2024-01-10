import { UserType } from "./type";
import { createUser, getName } from "./repository";
import { ApiError } from "../../config/Error";
import { hash } from "bcryptjs";
import { role as constant } from "../../utils/constants/role";

const createUserService = async (data: UserType) => {
  try {
    const { name, password, role } = data;

    if (role !== constant.MANAGER)
      throw new ApiError("Apenas gerentes podem criar usuários", null);

    if (!name || !password || !role)
      throw new ApiError("Dados inválidos", null);

    const userExists = await getName(name);

    if (userExists) throw new ApiError("Usuário já existe", null);

    const passwordHash = await hash(password, 8);

    data.password = passwordHash;

    await createUser(data);
  } catch (error) {
    throw new ApiError("Erro ao criar um usuário", error);
  }
};

export { createUserService };
