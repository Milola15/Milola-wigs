'use client';

import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import Navbar from '@/app/components/Navbar';

export default function AdminUploadPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState([]);

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((r) => r.url);
      setUrls((prev) => [...prev, ...newUrls]);
      setUploading(false);
      setFiles([]);
    },
    onUploadError: (error) => {
      alert(`Erreur: ${error.message}`);
      setUploading(false);
    },
  });

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    await startUpload(files);
  };

  return (
    <main className="bg-brun-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-xs tracking-widest text-brun-400 uppercase mb-1">Administration</p>
        <h1 className="font-display text-3xl text-brun-900 mb-8">Upload d'images</h1>

        <div className="bg-white rounded-2xl border border-brun-100 p-8">
          <div className="border-2 border-dashed border-brun-200 rounded-xl p-8 text-center mb-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brun-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-brun-400 text-sm">
                Clique pour sélectionner des images
              </span>
              <span className="text-brun-300 text-xs">
                JPG, PNG — max 4MB par image
              </span>
            </label>
          </div>

          {/* Aperçu des fichiers sélectionnés */}
          {files.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-brun-600 font-medium mb-3">
                {files.length} fichier(s) sélectionné(s) :
              </p>
              <div className="grid grid-cols-3 gap-3">
                {files.map((file, i) => (
                  <div key={i} className="bg-brun-50 rounded-lg p-2 text-xs text-brun-400 truncate">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!files.length || uploading}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
              uploading
                ? 'bg-brun-200 text-brun-400 cursor-not-allowed'
                : files.length
                ? 'bg-brun-900 text-brun-50 hover:bg-brun-700'
                : 'bg-brun-100 text-brun-400 cursor-not-allowed'
            }`}
          >
            {uploading ? 'Upload en cours...' : 'Uploader les images'}
          </button>
        </div>

        {/* URLs générées */}
        {urls.length > 0 && (
          <div className="bg-white rounded-2xl border border-brun-100 p-8 mt-6">
            <h2 className="font-display text-xl text-brun-900 mb-4">
              ✅ Images uploadées — copie ces URLs dans Prisma Studio
            </h2>
            <div className="flex flex-col gap-3">
              {urls.map((url, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 bg-brun-50 rounded-lg p-3">
                    <p className="text-xs text-brun-600 break-all">{url}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(url)}
                    className="text-xs bg-brun-900 text-brun-50 px-3 py-2 rounded-lg hover:bg-brun-700 transition-colors"
                  >
                    Copier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-brun-100 py-6 text-center text-xs bg-brun-900 text-brun-200 mt-10">
        © 2026 Milola Wigs
      </footer>
    </main>
  );
}