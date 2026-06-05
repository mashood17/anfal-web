import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const HOURS = [
  { day: 'Monday – Wednesday', time: '6:00 AM – 11:55 PM' },
  { day: 'Thursday – Sunday',  time: '6:00 AM – 11:55 PM' },
]

const MAPS_EMBED = 'https://maps.app.goo.gl/oLNgCoxcqe7dPZKf7'
const MAPS_IFRAME = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d75.5!3d12.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAnfal+Restaurant!5e0!3m2!1sen!2sin!4v1'

export default function Contact() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: '#0D3615' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Visit Us</p>
          <div className="accent-line" style={{ margin: '0 auto 20px' }} />
          <h2 className="section-title">Find Anfal Restaurant</h2>
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Address */}
            <InfoBlock icon="📍" title="Address">
              <p>NH 75, Sulthan Bag, Near HP Pump,</p>
              <p>Soorikumeru, Mani</p>
              <a
                href={MAPS_EMBED}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#C6FF00', fontSize: '12px', textDecoration: 'none', marginTop: '8px', display: 'block' }}
              >
                Get Directions →
              </a>
            </InfoBlock>

            {/* Phone */}
            <InfoBlock icon="📞" title="Phone">
              <a href="tel:+919037154400" style={{ color: 'rgba(245,242,236,0.65)', textDecoration: 'none', display: 'block' }}>
                +91 90371 54400
              </a>
              <a href="tel:+919372034901" style={{ color: 'rgba(245,242,236,0.65)', textDecoration: 'none', display: 'block', marginTop: '4px' }}>
                +91 93720 34901
              </a>
            </InfoBlock>

            {/* WhatsApp */}
            <InfoBlock icon="💬" title="WhatsApp">
            <a
                href="https://wa.me/919037154400"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#C6FF00', textDecoration: 'none' }}
              >
                Chat on WhatsApp →
              </a>
            </InfoBlock>

            {/* Hours */}
            <InfoBlock icon="🕐" title="Opening Hours">
              {HOURS.map(({ day, time }) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(245,242,236,0.55)' }}>{day}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(245,242,236,0.8)', fontWeight: 500 }}>{time}</span>
                </div>
              ))}
            </InfoBlock>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(198,255,0,0.1)',
              aspectRatio: '4/3',
              minHeight: '300px',
            }}
          >
            <iframe
              src={MAPS_IFRAME}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anfal Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ icon, title, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '16px', fontWeight: 600,
          color: '#F5F2EC',
        }}>
          {title}
        </h3>
      </div>
      <div style={{ paddingLeft: '28px', fontSize: '14px', color: 'rgba(245,242,236,0.65)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}