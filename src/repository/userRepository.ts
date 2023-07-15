import { AppDataSource } from "../data-source";
import { Formulario } from "../entities/ResLogin";

export const userRepository = AppDataSource.getRepository(Formulario);