import client from './client'

// Categories
export const getAdminCategories  = ()       => client.get('/admin/categories')
export const createCategory      = (data)   => client.post('/admin/categories', data)
export const updateCategory      = (id, data) => client.put(`/admin/categories/${id}`, data)
export const deleteCategory      = (id)     => client.delete(`/admin/categories/${id}`)

// Items
export const getAdminItems  = ()          => client.get('/admin/items')
export const createItem     = (data)      => client.post('/admin/items', data)
export const updateItem     = (id, data)  => client.put(`/admin/items/${id}`, data)
export const deleteItem     = (id)        => client.delete(`/admin/items/${id}`)

// Branding
export const getBranding    = ()     => client.get('/admin/branding')
export const updateBranding = (data) => client.put('/admin/branding', data)