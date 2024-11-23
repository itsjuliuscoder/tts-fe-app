"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { FcAudioFile } from "react-icons/fc";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import default styles

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>('');
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setProgress(0);
    NProgress.start();
    console.log({ file, language });

    if (!file || !language) {
      toast.error('Please upload a file and choose a language', { position: 'top-right' });
      setIsLoading(false);
      NProgress.done();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    try {
      const response = await axios.post('https://tts-be-app.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Ensure the response is treated as a blob
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? 0;
          const current = progressEvent.loaded;
          setProgress(Math.round((current / total) * 50)); // Upload progress (50%)
          NProgress.set(current / total * 0.5); // Upload progress (50%)
        },
        onDownloadProgress: (progressEvent) => {
          const total = progressEvent.total ?? 0;
          const current = progressEvent.loaded;
          setProgress(50 + Math.round((current / total) * 50)); // Download progress (50%)
          NProgress.set(0.5 + (current / total * 0.5)); // Download progress (50%)
        },
      });
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error response
    } finally {
      setIsLoading(false);
      NProgress.done();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFile(file);
      setFileDetails({ name: file.name, size: file.size });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isLoading ? (<h1 className="text-2xl text-center font-bold mb-4 font-[family-name:var(--font-geist-poppins)] text-slate-900">Your request is being processed....</h1>) : audioUrl ? ((<h1 className="text-2xl text-center font-bold mb-4 font-[family-name:var(--font-geist-poppins)] text-slate-900">Listen or Download Audio</h1>)) : (<div><h1 className="text-2xl font-bold mb-2 text-center font-[family-name:var(--font-geist-poppins)] text-slate-900">Text to Speech Web App.</h1>
          <p className='text-black mb-4 text-center font-[family-name:var(--font-geist-poppins)]'>Upload your PDF/Word document and listen to its content.</p>
        </div>)}
        {isLoading ? (
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div className="bg-blue-600 h-6 text-center font-[family-name:var(--font-geist-poppins)] rounded-full" style={{ width: `${progress}%` }}>{`${progress}%`}</div>
          </div>
        ) : audioUrl ? (
          <div className="mt-4">
            <FcAudioFile className="text-9xl text-blue-600 mx-auto mb-3" />
            <audio controls src={audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
            <a
              href={audioUrl}
              download="audio.mp3"
              className="mt-2 block text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              Download Audio
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-gray-700 mt-2 font-[family-name:var(--font-geist-nunito)]">Upload File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 font-[family-name:var(--font-geist-nunito)] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {fileDetails && (
                <div className="mt-2 text-gray-600">
                  <p className='font-[family-name:var(--font-geist-poppins)]'><b>File Name:</b> {fileDetails.name}</p>
                  <p className='font-[family-name:var(--font-geist-poppins)]'><b>File Size:</b> {(fileDetails.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-[family-name:var(--font-geist-nunito)]">Select Language</label>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black font-[family-name:var(--font-geist-nunito)] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" label="Select language" />
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
      <Link href="https://www.juliusolajumoke.com" legacyBehavior>
        <a className="text-blue-500 mt-4 font-[family-name:var(--font-geist-poppins)] hover:underline">&copy; Julius Olajumoke</a>
      </Link>
    </div>
  );
}