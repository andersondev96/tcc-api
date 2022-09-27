import { v4 as uuid } from "uuid";

import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/users/infra/prisma/entities/UserToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

export class FakeUsersTokenRepository implements IUsersTokenRepository {

    private userToken: UserToken[] = [];

    public async create(data: ICreateUserTokenDTO): Promise<UserToken> {
        Object.assign(data, {
            id: uuid(),
        });

        this.userToken.push(data);

        return data;
    }

    public async findByUserAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const token = this.userToken.find(
            (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
        );

        return token;
    }

    public async deleteById(id: string): Promise<void> {
        const token = this.userToken.find((ut) => ut.id === id);
        this.userToken.splice(this.userToken.indexOf(token));
    }

    public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const token = this.userToken.find(
            (ut) => ut.refresh_token === refresh_token
        );
        return token;
    }
}
