"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PutBlobResult } from "@vercel/blob";
import { uploadSoundEffect } from "@/actions/upload-sound-effect";

export function AddSoundEffectDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [blob, setBlob] = useState<{
    url: string;
    filename: string;
    size: number;
    contentType: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Function to check file duration
  function checkFileDuration(file: File) {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);

    audio.onloadedmetadata = () => {
      if (audio.duration > 20) {
        setError("File exceeds the 20 second limit");
        setFile(null);
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      } else {
        setDuration(audio.duration);
        setError("");
      }
    };

    audio.onerror = () => {
      setError("Invalid file format");
      setFile(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    };
  }

  // File upload handler
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (!selectedFile.type.includes("audio/")) {
        setError("Please select a valid audio file");
        return;
      }

      setFile(selectedFile);
      checkFileDuration(selectedFile);
    }
  }

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadComplete(false);

      // Simulate progress updates (server actions don't provide progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // Use server action to upload the file
      // const file = await uploadSoundEffect(formData);
      // clearInterval(progressInterval);
      // setBlob(file);
      // setUploadProgress(100);

      // console.log("File uploaded successfully:", file.url);

      setUploading(false);
      setUploadComplete(true);

      // Close dialog after successful upload
      setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 1500);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        "Error uploading file: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
      setUploading(false);
    }
  }

  // Reset form function
  function resetForm() {
    setFile(null);
    setDuration(0);
    setError("");
    setUploadProgress(0);
    setUploading(false);
    setUploadComplete(false);
    setBlob(null);
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add Sound Effect</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Sound Effect</DialogTitle>
          <DialogDescription>
            Upload an MP3 file (maximum 20 seconds).
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleSubmit} className="space-y-4 mt-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="sound-file">Audio File (MP3)</Label>
            <Input
              id="sound-file"
              name="file"
              ref={inputFileRef}
              type="file"
              accept="audio/mp3,audio/mpeg"
              onChange={handleFileChange}
              disabled={uploading}
              required
            />
          </div>

          {file && (
            <div className="text-sm">
              <p>Name: {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
              <p>Duration: {duration.toFixed(2)} seconds</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {uploading && (
            <div className="space-y-2">
              <p className="text-sm">Uploading: {uploadProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {uploadComplete && (
            <Alert>
              <AlertDescription className="text-green-600">
                Upload complete!
              </AlertDescription>
            </Alert>
          )}

          {blob && (
            <Alert>
              <AlertDescription>
                Sound effect URL:{" "}
                <a
                  href={blob.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {blob.url}
                </a>
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!file || !!error || uploading || uploadComplete}
            >
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
