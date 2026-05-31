import { useEffect }   from 'react'
import { useForm }     from 'react-hook-form'
import ImageUploader   from '@/components/ui/ImageUploader'
import { X }           from 'lucide-react'

export default function CategoryForm({ initial, onSave, onClose, saving }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name:        initial?.name        || '',
      description: initial?.description || '',
      sort_order:  initial?.sort_order  || 0,
      banner:      initial?.banner      || null,
    },
  })
  const banner = watch('banner')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">
            {initial ? 'Edit Category' : 'New Category'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name *</label>
            <input
              {...register('name', { required: true })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                         text-sm text-white focus:outline-none focus:border-brand-accent/60"
              placeholder="e.g. Mandi"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Tagline</label>
            <input
              {...register('description')}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                         text-sm text-white focus:outline-none focus:border-brand-accent/60"
              placeholder="e.g. Traditional Arabian Rice Experience"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Sort Order</label>
            <input
              type="number"
              {...register('sort_order', { valueAsNumber: true })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                         text-sm text-white focus:outline-none focus:border-brand-accent/60"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Banner Image</label>
            <ImageUploader
              value={banner}
              onChange={(path) => setValue('banner', path)}
              folder="categories"
            />
          </div>

          <div className="flex gap-3 pt-2 justify-end">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-5 py-2 text-sm bg-brand-accent text-gray-950 font-semibold
                         rounded-lg hover:bg-brand-accent/90 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}