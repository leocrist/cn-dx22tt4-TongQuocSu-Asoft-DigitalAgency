"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSnackbar } from "./snackbar-provider";
interface WorkFormProps {
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
  initialData?: {
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    duration?: string;
    budget?: string;
    previewLink?: string;
  };
}

export function WorkForm({
  onSubmit,
  isSubmitting,
  initialData,
}: WorkFormProps) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [previewImage, setPreviewImage] = useState(
    initialData?.image || "/placeholder.svg?height=400&width=500"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const uploadedImageUrl = await uploadImage(selectedFile);
      if (uploadedImageUrl) {
        formData.append("imageUrl", uploadedImageUrl);
      }
    } catch (error) {
      showSnackbar("Error uploading image", "error");
    }
    onSubmit(formData);
  };

  const uploadImage = async (file: File | null) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const { url } = await uploadResponse.json();
      return url;
    } else {
      throw new Error("Failed to upload image");
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL for the selected file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Upload the file immediately
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            defaultValue={
              initialData?.year || new Date().getFullYear().toString()
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            defaultValue={initialData?.duration || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
            placeholder="e.g., 5 Days, 2 Weeks, 3 Months"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            defaultValue={initialData?.budget || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
            placeholder="e.g., $, $$, $$$"
          />
        </div>

        <div>
          <label
            htmlFor="previewLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preview Link
          </label>
          <input
            type="url"
            id="previewLink"
            name="previewLink"
            defaultValue={initialData?.previewLink || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            defaultValue={initialData?.description || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <div className="mt-1 flex items-center">
            <div className="relative h-32 w-32 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={previewImage || "/placeholder.svg"}
                alt="Work preview"
                fill
                className="object-cover"
              />
            </div>
            <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E13E8] cursor-pointer">
              Change
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/works")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#6E13E8] text-white rounded-md hover:bg-[#5a0bc0] disabled:opacity-70"
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Work"
              : "Create Work"}
          </button>
        </div>
      </form>
    </div>
  );
}
