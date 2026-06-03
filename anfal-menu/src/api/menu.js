import client from './client'

// All endpoints are restaurant-scoped by slug.
// This is your SaaS foundation — swap 'anfal' for any slug.

export const getRestaurant  = (slug)           => client.get(`/restaurants/${slug}`)
export const getCategories  = (restaurantId)   => client.get(`/categories?restaurant_id=${restaurantId}`)
export const getMenuItems   = (restaurantId)   => client.get(`/items?restaurant_id=${restaurantId}`)
export const getFeatured    = (restaurantId)   => client.get(`/items/featured?restaurant_id=${restaurantId}`)  
