import { useState, useMemo, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DndContext, closestCenter,
  KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  getAdminCategories, createCategory,
  updateCategory, deleteCategory, reorderCategories,
} from '@/api/menu'
import CategoryForm  from '@/components/forms/CategoryForm'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import DragHandle    from '@/components/ui/DragHandle'
import toast         from 'react-hot-toast'

// ── Sortable row ──────────────────────────────────────────────
function SortableCategoryRow({ cat, search, highlight, onEdit, onDelete }) {
  const {
    attributes, listeners,
    setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: cat.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity:   isDragging ? 0.45 : 1,
        zIndex:    isDragging ? 50 : 'auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '12px 14px',
        backgroundColor: isDragging ? '#1a2740' : '#111827',
        border: `1px solid ${isDragging ? 'rgba(198,255,0,0.35)' : '#1f2937'}`,
        borderRadius: '12px',
      }}
    >
      <DragHandle listeners={listeners} attributes={attributes} />

      {cat.banner && (
        <img
          src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${cat.banner}`}
          alt=""
          style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {highlight(cat.name, search)}
        </p>
        {cat.description && (
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {highlight(cat.description, search)}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
        <IconBtn onClick={() => onEdit(cat)}   label="Edit"   hoverColor="#f9fafb">✎</IconBtn>
        <IconBtn onClick={() => onDelete(cat)} label="Delete" hoverColor="#f87171">🗑</IconBtn>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function CategoriesPage() {
  const qc = useQueryClient()

  const [editing,    setEditing]    = useState(null)
  const [deleting,   setDeleting]   = useState(null)
  const [search,     setSearch]     = useState('')

  // displayOrder: the source of truth for what's shown in the list.
  // Starts null — populated from server data on first load.
  // After a drag it holds the reordered array directly (no sort_order dependency).
  const [displayOrder, setDisplayOrder] = useState(null)

  const { data: serverCategories = [], isLoading } = useQuery({
    queryKey: ['admin-cats'],
    queryFn:  getAdminCategories,
    onSuccess: (data) => {
      // Sync display order from server whenever server data arrives
      // BUT only if we don't have a pending local reorder in flight
      setDisplayOrder(
        [...data].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      )
    },
  })

  // On initial render before onSuccess fires, derive from server data
  const orderedCategories = displayOrder ??
    [...serverCategories].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return orderedCategories
    return orderedCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        (cat.description && cat.description.toLowerCase().includes(q))
    )
  }, [orderedCategories, search])

  const invalidate = useCallback(() => {
    qc.invalidateQueries({ queryKey: ['admin-cats'] })
  }, [qc])

  const createMut  = useMutation({ mutationFn: createCategory,
    onSuccess: () => { toast.success('Category created'); invalidate(); setEditing(null) } })
  const updateMut  = useMutation({ mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => { toast.success('Category updated'); invalidate(); setEditing(null) } })
  const deleteMut  = useMutation({ mutationFn: deleteCategory,
    onSuccess: () => { toast.success('Category deleted'); invalidate(); setDeleting(null) } })
  const reorderMut = useMutation({
    mutationFn: reorderCategories,
    onSuccess: () => {
      // Invalidate so server data re-syncs — but keep displayOrder
      // so there's no visual flicker
      qc.invalidateQueries({ queryKey: ['admin-cats'] })
    },
    onError: () => {
      toast.error('Reorder failed — refreshing')
      setDisplayOrder(null)
      invalidate()
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = useCallback(({ active, over }) => {
    if (!over || active.id === over.id) return

    const oldIndex  = orderedCategories.findIndex((c) => c.id === active.id)
    const newIndex  = orderedCategories.findIndex((c) => c.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    // Update display immediately — no sort by sort_order after this
    const reordered = arrayMove(orderedCategories, oldIndex, newIndex)
    setDisplayOrder(reordered)

    // Build payload: position in array = new sort_order
    const order = reordered.map((cat, i) => ({ id: cat.id, sort_order: i + 1 }))
    reorderMut.mutate(order)
  }, [orderedCategories, reorderMut])

  const handleSave = (data) => {
    if (editing === 'new') createMut.mutate(data)
    else updateMut.mutate({ id: editing.id, data })
  }

  const highlight = (text, q) => {
    if (!q.trim()) return text
    const re = new RegExp(`(${q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return String(text).split(re).map((part, i) =>
      re.test(part)
        ? <mark key={i} style={{ background: 'transparent', color: '#C6FF00', fontWeight: 700 }}>{part}</mark>
        : part
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb' }}>Categories</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
            Drag to reorder · {serverCategories.length} categories
          </p>
        </div>
        <button
          onClick={() => setEditing('new')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#C6FF00', color: '#030712', fontWeight: 700, fontSize: '13px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          + Add Category
        </button>
      </div>

      {/* Search */}
      <SearchInput value={search} onChange={setSearch} placeholder="Search categories…" />

      {search.trim() && !isLoading && (
        <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px', marginBottom: '10px' }}>
          <span style={{ color: '#C6FF00', fontWeight: 600 }}>{filteredCategories.length}</span>
          {' '}result{filteredCategories.length !== 1 ? 's' : ''} for "
          <span style={{ color: '#9ca3af' }}>{search.trim()}</span>"
        </p>
      )}

      {isLoading ? (
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '16px' }}>Loading...</p>
      ) : orderedCategories.length === 0 ? (
        <EmptyState message="No categories yet. Add your first one." />
      ) : filteredCategories.length === 0 ? (
        <EmptyState message="No categories match your search." />
      ) : search.trim() ? (
        /* Search active — DnD disabled to avoid confusion */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {filteredCategories.map((cat) => (
            <SortableCategoryRow
              key={cat.id} cat={cat} search={search}
              highlight={highlight}
              onEdit={setEditing} onDelete={setDeleting}
            />
          ))}
        </div>
      ) : (
        /* Normal — DnD active */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedCategories.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {orderedCategories.map((cat) => (
                <SortableCategoryRow
                  key={cat.id} cat={cat} search={search}
                  highlight={highlight}
                  onEdit={setEditing} onDelete={setDeleting}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {editing && (
        <CategoryForm
          initial={editing === 'new' ? null : editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
          saving={createMut.isPending || updateMut.isPending}
        />
      )}
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

// ── Shared ────────────────────────────────────────────────────
function IconBtn({ onClick, label, hoverColor, children }) {
  return (
    <button
      onClick={onClick} aria-label={label}
      style={{ padding: '7px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', borderRadius: '6px', fontSize: '15px', lineHeight: 1 }}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = hoverColor }}
      onMouseOut={(e)  => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' }}
    >
      {children}
    </button>
  )
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative' }}>
      <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', pointerEvents: 'none' }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 36px', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', color: '#f9fafb', fontSize: '13px', outline: 'none' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#C6FF00' }}
        onBlur={(e)  => { e.currentTarget.style.borderColor = '#1f2937' }}
      />
      {value && (
        <button onClick={() => onChange('')}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', backgroundColor: '#1f2937', border: 'none', borderRadius: '50%', color: '#9ca3af', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >✕</button>
      )}
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <p style={{ fontSize: '13px', color: '#6b7280' }}>{message}</p>
    </div>
  )
}