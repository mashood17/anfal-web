import { useState }           from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminCategories, createCategory, updateCategory, deleteCategory } from '@/api/menu'
import PageHeader      from '@/components/ui/PageHeader'
import ConfirmDialog   from '@/components/ui/ConfirmDialog'
import CategoryForm    from '@/components/forms/CategoryForm'
import { Pencil, Trash2, Plus } from 'lucide-react'
import toast           from 'react-hot-toast'

export default function CategoriesPage() {
  const qc                       = useQueryClient()
  const [editing, setEditing]    = useState(null)   // null | 'new' | category obj
  const [deleting, setDeleting]  = useState(null)

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['admin-cats'],
    queryFn:  getAdminCategories,
  })

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-cats'] })

  const createMut = useMutation({ mutationFn: createCategory, onSuccess: () => { toast.success('Category created'); invalidate(); setEditing(null) } })
  const updateMut = useMutation({ mutationFn: ({ id, data }) => updateCategory(id, data), onSuccess: () => { toast.success('Category updated'); invalidate(); setEditing(null) } })
  const deleteMut = useMutation({ mutationFn: deleteCategory, onSuccess: () => { toast.success('Category deleted'); invalidate(); setDeleting(null) } })

  const handleSave = (data) => {
    if (editing === 'new') createMut.mutate(data)
    else updateMut.mutate({ id: editing.id, data })
  }

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage your menu sections"
        action={
          <button
            onClick={() => setEditing('new')}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-gray-950 
                       text-sm font-semibold rounded-lg hover:bg-brand-accent/90 transition-colors"
          >
            <Plus size={15} /> Add Category
          </button>
        }
      />

      {isLoading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between px-4 py-3 
                         bg-gray-900 border border-gray-800 rounded-xl"
            >
              <div className="flex items-center gap-3">
                {cat.banner && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${cat.banner}`}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-white">{cat.name}</p>
                  {cat.description && (
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(cat)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 
                             rounded-lg transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleting(cat)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 
                             rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form drawer */}
      {editing && (
        <CategoryForm
          initial={editing === 'new' ? null : editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
          saving={createMut.isPending || updateMut.isPending}
        />
      )}

      {/* Delete confirm */}
      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.name}"? All items inside will also be deleted.`}
          onConfirm={() => deleteMut.mutate(deleting.id)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}