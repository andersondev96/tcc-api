import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";
import { IStorageProvider } from "../models/IStorageProvider";

export class S3StorageProvider implements IStorageProvider {

  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${file}`,
      ACL: "public-read",
      Body: fileContent,
      ContentType,
    }).then((data) => {
      console.log("Completed upload", data);
    }).catch((err) => {
      console.log("Failed to upload", err);
    });

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${file}`,
    }).then((data) => {
      console.log("File deleted", data);
    }).catch((err) => {
      console.log("Failed to deleted file", err);
    });
  }

}