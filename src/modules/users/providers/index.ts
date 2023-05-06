import { container } from "tsyringe";

import BCryptProvider from "./HashProvider/implementations/BCryptProvider";
import { IHashProvider } from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptProvider);