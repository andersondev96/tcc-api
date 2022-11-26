import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/models/IDateProvider";
import BCryptProvider from "./HashProvider/implementations/BCryptProvider";
import { IHashProvider } from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptProvider);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
