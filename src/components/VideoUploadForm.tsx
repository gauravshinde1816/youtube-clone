// UploadPage.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Or your preferred HTTP library (e.g., fetch)

const UploadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Validation errors

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(event.target.files?.[0] || null);
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Validation:
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!videoFile) newErrors.videoFile = 'Video file is required';
    // Add more validation rules as needed
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // 2. File Upload:
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile!);
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    try {
      const response = await axios.post('/api/upload', formData, { // Replace with your API endpoint
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log(response.data); // Handle successful upload response
      // Clear form or redirect to the uploaded video page
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle upload error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

        <form onSubmit={handleSubmit}>
          {/* ... Input fields for title and description (similar to previous examples) ... */}

          {/* Video File Input */}
          <div className="mb-4">
            <label htmlFor="videoFile" className="block text-gray-700 text-sm font-bold mb-2">
              Video File
            </label>
            <input type="file" id="videoFile" onChange={handleVideoChange} accept="video/*" required />
            {errors.videoFile && <p className="text-red-500 text-xs italic">{errors.videoFile}</p>}
          </div>

          {/* Thumbnail Input */}
          <div className="mb-4">
            <label htmlFor="thumbnailFile" className="block text-gray-700 text-sm font-bold mb-2">
              Thumbnail
            </label>
            <input type="file" id="thumbnailFile" onChange={handleThumbnailChange} accept="image/*" />
          </div>

          {/* ... Submit button ... */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default UploadPage;
