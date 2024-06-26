"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "./ui/use-toast";

interface ImageUploadProps {
  userId: string | null | undefined;
}

export default function ImageUpload({ userId }: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | undefined>();

  useEffect(() => {
    const fetchImage = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/user?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setImagePreview(data.image);
          } else {
            toast({ title: "error", description: data.error });
          }
        } catch (error) {
          toast({ title: "error", description: "Failed to fetch image" });
        }
      }
    };

    fetchImage();
  }, [userId]);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      console.error("No file selected");
      return;
    }
    setUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      setImagePreview(base64data);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: base64data }),
      });

      const responseJson = await res.json();
      if (responseJson.success) {
        setUploading(false);
        return toast({
          title: "成功",
          description: "画像の保存に成功しました。",
        });
      } else {
        console.error("Upload failed:", responseJson.error);
        setUploading(false);
        return toast({
          title: "失敗",
          description: "画像の保存に成功しました。",
          variant: "destructive",
        });
      }
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
    }
  };

  return (
    <div>
      <h1>アイコン画像の更新</h1>
      <form onSubmit={handleUpload}>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Selected"
            width={200}
            height={200}
            className="m-2 rounded"
          />
        )}
        {!imagePreview && (
          <Image
            src="/default_icon.png"
            alt="Selected"
            width={200}
            height={200}
            className="m-2 rounded"
          />
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div>
          <button
            type="submit"
            disabled={uploading || !image}
            className={`mt-2 ${
              uploading || !image
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {uploading ? "アップロード中" : "アップロードする"}
          </button>
        </div>
      </form>
    </div>
  );
}
