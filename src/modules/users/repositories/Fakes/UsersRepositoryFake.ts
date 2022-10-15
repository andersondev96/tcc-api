import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/prisma/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryFake implements IUsersRepository {
    public async findById(id: string): Promise<User> {
        const findUserById = this.users.find((user) => user.id === id);

        return findUserById;
    }

    private users: User[] = [];

    public async create(data: ICreateUserDTO): Promise<User> {
        Object.assign(data, {
            id: uuid(),
        });

        this.users.push(data);
        return data;
    }

    public async findByMail(email: string): Promise<User> {
        const findUser = this.users.find((user) => user.email === email);

        return findUser;
    }

    public async update(user: ICreateUserDTO): Promise<User> {
        const index = this.users.findIndex(findUser => findUser.id === user.id);

        this.users[index] = user;

        return user;
    }

    public async delete(id: string): Promise<void> {
        const index = this.users.findIndex(
            user => user.id === id
        );

        this.users.splice(index, 1);
    }
}
