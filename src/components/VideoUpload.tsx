import React, { useState } from "react";
import axios from "axios";

const VideoUploadPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(event.target.files?.[0] || null);
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThumbnailFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!videoFile) newErrors.videoFile = "Video file is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile!);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/create-video`, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="videoFile" className="block mb-1">
              Video File
            </label>
            <input
              type="file"
              id="videoFile"
              onChange={handleVideoChange}
              accept="video/*"
              required
            />
            {errors.videoFile && (
              <p className="text-red-500 text-xs mt-1">{errors.videoFile}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnailFile" className="block mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnailFile"
              onChange={handleThumbnailChange}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Upload
          </button>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="mt-4">
              <progress value={uploadProgress} max="100" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VideoUploadPage;
