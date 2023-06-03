import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./models/IStorageProvider";



const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  new diskStorage[process.env.disk]
);