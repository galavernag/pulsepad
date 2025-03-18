"use server";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function uploadSoundEffect(formData: FormData) {
  const file = formData.get("file") as File;
  const { userId } = await auth();

  if (!file) {
    throw new Error("No file received");
  }

  // Check file type
  if (!file.type.includes("audio/")) {
    throw new Error("Please select a valid audio file");
  }

  // Convert File to buffer for S3 upload
  const buffer = await file.arrayBuffer();

  // Generate a unique filename or use the original name
  const filename = `${Date.now()}-${file.name}`;

  // Define bucket name baseado no ambiente
  const bucketName = env.AWS_S3_BUCKET_NAME;

  // Prepare the S3 upload parameters
  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: `${userId}/${filename}`,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  };

  try {
    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct the URL for the uploaded file
    let fileUrl;

    if (process.env.NODE_ENV === "development") {
      // URL para MinIO local
      fileUrl = `${
        env.S3_ENDPOINT || "http://localhost:9000"
      }/${bucketName}/pulsepad-sounds/${userId}/${filename}`;
    } else {
      // URL para AWS S3
      fileUrl = `https://${bucketName}.s3.${env.AWS_REGION}.amazonaws.com/pulsepad-sounds/${userId}/${filename}`;
    }

    // You could save the fileUrl to your database here

    revalidatePath("/");
    return {
      url: fileUrl,
      filename: filename,
      size: file.size,
      contentType: file.type,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}
