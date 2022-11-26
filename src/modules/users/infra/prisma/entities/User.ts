export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ name, email, password }: User) {
    return Object.assign(this, {
      name,
      email,
      password,
    });
  }
}
