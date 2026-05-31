import { useCallback, useState } from 'react'
import { useDropzone }           from 'react-dropzone'
import { uploadImage }           from '@/api/upload'
import { ImagePlus, Loader2, X } from 'lucide-react'

export default function ImageUploader({ value, onChange, folder = 'general' }) {
  const [uploading, setUploading] = useState(false)
  const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploading(true)
    try {
      const { path, public_url } = await uploadImage(file, folder)
      onChange(path)   // store path in DB
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
    }
  }, [folder, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    disabled: uploading,
  })

  const previewUrl = value
    ? (value.startsWith('http') ? value : `${storageUrl}/${value}`)
    : null

  return (
    <div className="space-y-2">
      {previewUrl ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-800">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full 
                       flex items-center justify-center text-white hover:bg-black/80"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col
                      items-center justify-center cursor-pointer transition-colors
                      ${isDragActive
                        ? 'border-brand-accent bg-brand-accent/5'
                        : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'
                      }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 size={20} className="animate-spin text-gray-400" />
          ) : (
            <>
              <ImagePlus size={20} className="text-gray-500 mb-2" />
              <p className="text-xs text-gray-500">
                {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-gray-600 mt-1">JPG, PNG, WebP</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}