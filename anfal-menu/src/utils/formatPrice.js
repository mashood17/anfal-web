export function formatSinglePrice(price) {
  return `₹${Number(price).toLocaleString('en-IN')}`
}

export function formatVariantPrices(prices = []) {
  // prices = [{ label: 'Q', price: 249 }, { label: 'H', price: 479 }, ...]
  return prices.map((p) => ({
    label: p.label,
    display: `₹${Number(p.price).toLocaleString('en-IN')}`,
  }))
}