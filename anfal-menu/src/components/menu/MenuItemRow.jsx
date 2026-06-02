import { motion } from 'framer-motion'
import { formatSinglePrice } from '@/utils/formatPrice'

export default function MenuItemRow({ item }) {
  const prices    = item.prices || []
  const isSingle  = prices.length === 1
  const isMulti   = prices.length > 1

  return (
    <div className="item-row">
      {/* Left block: dot + name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.food_type && <FoodDot type={item.food_type} />}
          <span className="item-name">{item.name}</span>
          {item.badge === 'best_seller' && <BestSellerStar />}
        </div>
        {item.description && (
          <p className="item-desc">{item.description}</p>
        )}
      </div>

      {/* Right block: price(s) */}
      {isSingle && (
        <span className="item-price">
          ₹{formatPrice(prices[0].price)}
        </span>
      )}

      {isMulti && (
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          {prices.map((p) => (
            <div
              key={p.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                gap: '8px',
                lineHeight: '1.8',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-faint)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                  minWidth: '16px',
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--brand-accent)',
                  minWidth: '48px',
                  textAlign: 'right',
                }}
              >
                ₹{formatPrice(p.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FoodDot({ type }) {
  return (
    <span
      style={{
        width: '7px', height: '7px',
        borderRadius: '50%',
        backgroundColor: type === 'veg' ? '#4ade80' : '#f87171',
        flexShrink: 0,
        display: 'inline-block',
      }}
      title={type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
    />
  )
}

function BestSellerStar() {
  return (
    <span
      style={{
        fontSize: '9px', fontWeight: 600,
        color: '#C6FF00',
        border: '1px solid rgba(198,255,0,0.3)',
        borderRadius: '100px',
        padding: '1px 6px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}
    >
      ★
    </span>
  )
}

function formatPrice(price) {
  return Number(price).toLocaleString('en-IN')
}