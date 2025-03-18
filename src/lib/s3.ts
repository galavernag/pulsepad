import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

export const s3Client = new S3Client({
  region: env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID || "minioadmin",
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "minioadmin",
  },
  // Configuração adicional para MinIO local
  ...(process.env.NODE_ENV === "development" && {
    endpoint: env.S3_ENDPOINT || "http://localhost:9000",
    forcePathStyle: true, // Necessário para MinIO
  }),
});
