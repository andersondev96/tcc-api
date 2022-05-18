import IHashProvider from "../models/IHashProvider";

export class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
}
