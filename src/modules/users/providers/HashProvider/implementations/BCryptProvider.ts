import { hash } from "bcryptjs";

import IHashProvider from "../models/IHashProvider";

class BCryptProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BCryptProvider;
