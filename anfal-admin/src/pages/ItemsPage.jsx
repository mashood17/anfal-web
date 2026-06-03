import { useState, useMemo }  from 'react'
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
  IconBtn,
  SearchInput,
  EmptyState
} from '@/components/ui/AdminShared'

import {
  getAdminItems, getAdminCategories,
  createItem, updateItem, deleteItem, reorderItems,
} from '@/api/menu'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import ItemForm      from '@/components/forms/ItemForm'
import DragHandle    from '@/components/ui/DragHandle'
import toast         from 'react-hot-toast'

const BADGE_LABELS  = { best_seller: 'Best Seller', chef_special: 'Chef Special', popular: 'Popular', new: 'New' }
const BADGE_COLORS  = { best_seller: '#C6FF00', chef_special: '#fcd34d', popular: '#fb923c', new: '#60a5fa' }

// ── Sortable item row ─────────────────────────────────────────
function SortableItemRow({ item, catMap, search, highlight, onEdit, onDelete }) {
  const {
    attributes, listeners,
    setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex:  isDragging ? 10 : 'auto',
  }

  const badgeColor = item.badge ? BADGE_COLORS[item.badge] : null

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '10px 12px',
        backgroundColor: isDragging ? '#1a2740' : '#0f172a',
        border: `1px solid ${isDragging ? 'rgba(198,255,0,0.3)' : '#1e293b'}`,
        borderRadius: '10px',
      }}
    >
      <DragHandle listeners={listeners} attributes={attributes} />

      {/* Thumbnail */}
      {item.image ? (
        <img
          src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${item.image}`}
          alt=""
          style={{ width: '36px', height: '36px', borderRadius: '7px', objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <div style={{ width: '36px', height: '36px', borderRadius: '7px', backgroundColor: '#1e293b', flexShrink: 0 }} />
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {highlight(item.name, search)}
          </p>
          {item.badge && (
            <span style={{
              fontSize: '10px', fontWeight: 600, flexShrink: 0,
              color: badgeColor,
              border: `1px solid ${badgeColor}40`,
              borderRadius: '100px', padding: '1px 7px',
              backgroundColor: `${badgeColor}12`,
            }}>
              {BADGE_LABELS[item.badge]}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          {item.food_type && (
            <span style={{ fontSize: '11px', color: item.food_type === 'veg' ? '#4ade80' : '#f87171' }}>
              {item.food_type === 'veg' ? 'Veg' : 'Non-Veg'}
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: 'right', marginRight: '4px', flexShrink: 0 }}>
        {item.prices?.length === 1 && (
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#C6FF00' }}>₹{item.prices[0].price}</p>
        )}
        {item.prices?.length > 1 && (
          <p style={{ fontSize: '11px', color: '#475569' }}>
            {item.prices.map((p) => p.label.toUpperCase()).join(' / ')}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
        <IconBtn onClick={() => onEdit(item)} label="Edit" hoverColor="#f9fafb">✎</IconBtn>
        <IconBtn onClick={() => onDelete(item)} label="Delete" hoverColor="#f87171">🗑</IconBtn>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function ItemsPage() {
  const qc                           = useQueryClient()
  const [editing, setEditing]        = useState(null)
  const [deleting, setDeleting]      = useState(null)
  const [search, setSearch]          = useState('')
  const [localItems, setLocalItems]  = useState(null)

  const { data: rawItems      = [], isLoading } = useQuery({ queryKey: ['admin-items'], queryFn: getAdminItems })
  const { data: categories    = [] }            = useQuery({ queryKey: ['admin-cats'],  queryFn: getAdminCategories })

  const items  = localItems ?? rawItems
  const catMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), [categories])

  // Sorted categories for section headers
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [categories]
  )

  // Items grouped by category, each group sorted by sort_order
  const groupedItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    return sortedCategories.map((cat) => {
      let catItems = items
        .filter((i) => i.category_id === cat.id)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

      if (q) {
        catItems = catItems.filter((item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.food_type && item.food_type.toLowerCase().includes(q)) ||
          (item.badge && BADGE_LABELS[item.badge]?.toLowerCase().includes(q))
        )
      }
      return { cat, items: catItems }
    }).filter((g) => g.items.length > 0)
  }, [sortedCategories, items, search])

  const totalFiltered = groupedItems.reduce((acc, g) => acc + g.items.length, 0)

  const invalidate = () => { setLocalItems(null); qc.invalidateQueries({ queryKey: ['admin-items'] }) }

  const createMut  = useMutation({ mutationFn: createItem,
    onSuccess: () => { toast.success('Item created'); invalidate(); setEditing(null) }})
  const updateMut  = useMutation({ mutationFn: ({ id, data }) => updateItem(id, data),
    onSuccess: () => { toast.success('Item updated'); invalidate(); setEditing(null) }})
  const deleteMut  = useMutation({ mutationFn: deleteItem,
    onSuccess: () => { toast.success('Item deleted'); invalidate(); setDeleting(null) }})
  const reorderMut = useMutation({ mutationFn: reorderItems,
    onError: () => { toast.error('Reorder failed'); invalidate() }})

  const handleSave = (data) => {
    if (editing === 'new') createMut.mutate(data)
    else updateMut.mutate({ id: editing.id, data })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (categoryId) => ({ active, over }) => {
    if (!over || active.id === over.id) return

    const catItems = items
      .filter((i) => i.category_id === categoryId)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

    const oldIndex  = catItems.findIndex((i) => i.id === active.id)
    const newIndex  = catItems.findIndex((i) => i.id === over.id)
    const reordered = arrayMove(catItems, oldIndex, newIndex)

    // Optimistic: replace items in this category with new order
    const otherItems = items.filter((i) => i.category_id !== categoryId)
    setLocalItems([...otherItems, ...reordered])

    const order = reordered.map((item, i) => ({ id: item.id, sort_order: i + 1 }))
    reorderMut.mutate(order)
  }

  const highlight = (text, q) => {
    if (!text || !q.trim()) return text
    const re = new RegExp(`(${q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.split(re).map((part, i) =>
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
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb' }}>Menu Items</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
            {rawItems.length} items · {categories.length} categories · drag to reorder
          </p>
        </div>
        <button
          onClick={() => setEditing('new')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#C6FF00', color: '#030712', fontWeight: 700, fontSize: '13px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          + Add Item
        </button>
      </div>

      {/* Search */}
      <SearchInput value={search} onChange={setSearch} placeholder="Search by name, badge, type…" />

      {search.trim() && !isLoading && (
        <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '10px', marginTop: '8px' }}>
          <span style={{ color: '#C6FF00', fontWeight: 600 }}>{totalFiltered}</span>
          {' '}result{totalFiltered !== 1 ? 's' : ''} for "<span style={{ color: '#9ca3af' }}>{search.trim()}</span>"
        </p>
      )}

      {isLoading ? (
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '12px' }}>Loading...</p>
      ) : groupedItems.length === 0 ? (
        <EmptyState message="No items found" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '16px' }}>
          {groupedItems.map(({ cat, items: catItems }) => (
            <div key={cat.id}>
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '10px',
                paddingBottom: '8px',
                borderBottom: '1px solid #1e293b',
              }}>
                {cat.banner && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${cat.banner}`}
                    alt=""
                    style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                )}
                <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#C6FF00', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {cat.name}
                </h2>
                <span style={{ fontSize: '11px', color: '#475569', marginLeft: 'auto' }}>
                  {catItems.length} item{catItems.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Items — DnD disabled during search */}
              {search.trim() ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {catItems.map((item) => (
                    <SortableItemRow
                      key={item.id} item={item} catMap={catMap}
                      search={search} highlight={highlight}
                      onEdit={setEditing} onDelete={setDeleting}
                    />
                  ))}
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd(cat.id)}
                >
                  <SortableContext items={catItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {catItems.map((item) => (
                        <SortableItemRow
                          key={item.id} item={item} catMap={catMap}
                          search={search} highlight={highlight}
                          onEdit={setEditing} onDelete={setDeleting}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ItemForm
          initial={editing === 'new' ? null : editing}
          categories={sortedCategories}
          onSave={handleSave}
          onClose={() => setEditing(null)}
          saving={createMut.isPending || updateMut.isPending}
        />
      )}
      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.name}"?`}
          onConfirm={() => deleteMut.mutate(deleting.id)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}