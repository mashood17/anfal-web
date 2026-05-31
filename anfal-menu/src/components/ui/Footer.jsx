export default function Footer({ restaurant }) {
  const phone = restaurant?.phone
  const whatsapp = restaurant?.settings?.whatsapp
  const instagram = restaurant?.settings?.instagram
  const address = restaurant?.address

  return (
    <footer className="bg-black/30 border-t border-white/5 mt-16 py-10">
      <div className="section-container text-center space-y-4">
        <p className="font-display text-lg text-white/80">
          {restaurant?.name}
        </p>

        {address && (
          <p className="text-sm text-white/40">
            {address}
          </p>
        )}

        <div className="flex items-center justify-center gap-6 text-sm">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-white/50 hover:text-brand-accent transition-colors"
            >
              {phone}
            </a>
          )}

          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-brand-accent transition-colors"
            >
              WhatsApp
            </a>
          )}

          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-brand-accent transition-colors"
            >
              Instagram
            </a>
          )}
        </div>

        <p className="text-xs text-white/20 pt-4">
          Digital menu powered by{" "}
          <span className="text-white/40">
            YourCompany
          </span>
        </p>
      </div>
    </footer>
  )
}