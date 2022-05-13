import { UserRepository } from "../infra/prisma/repositories/UserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<void> {
    const user = await this.userRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
