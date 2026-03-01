const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + '/.env' })

const Barber      = require('./models/Barber')
const Service     = require('./models/Service')
const Appointment = require('./models/Appointment')

const barbers = [
  { name: 'Mike',   specialty: 'Fades & Tapers',    phone: '+1 555-0101', email: 'mike@barbershop.com',   status: 'active', rating: 4.9, clients: 120 },
  { name: 'John',   specialty: 'Classic Cuts',       phone: '+1 555-0102', email: 'john@barbershop.com',   status: 'active', rating: 4.7, clients: 98  },
  { name: 'David',  specialty: 'Beard Grooming',     phone: '+1 555-0103', email: 'david@barbershop.com',  status: 'active', rating: 4.6, clients: 85  },
  { name: 'Carlos', specialty: 'Hair Coloring',      phone: '+1 555-0104', email: 'carlos@barbershop.com', status: 'active', rating: 4.5, clients: 74  },
  { name: 'Alex',   specialty: 'Kids & Teen Cuts',   phone: '+1 555-0105', email: 'alex@barbershop.com',   status: 'active', rating: 4.4, clients: 60  },
]

const services = [
  { name: 'Classic Haircut',    description: 'Traditional scissor cut with styling',     category: 'Haircut', price: 25, duration: 30 },
  { name: 'Fade',               description: 'Skin fade or low/mid/high fade',            category: 'Haircut', price: 30, duration: 40 },
  { name: 'Beard Trim',         description: 'Shape and trim beard to your preference',  category: 'Beard',   price: 15, duration: 20 },
  { name: 'Hot Towel Shave',    description: 'Full straight-razor shave with hot towel', category: 'Shave',   price: 35, duration: 45 },
  { name: 'Hair Coloring',      description: 'Full color or highlights',                  category: 'Color',   price: 60, duration: 60 },
  { name: 'Kids Haircut',       description: 'Cuts for children under 12',               category: 'Haircut', price: 18, duration: 25 },
]

const appointments = [
  { customer: 'James Carter',   barber: 'Mike',   service: 'Fade',            date: '2026-02-24', time: '09:00 AM', status: 'completed' },
  { customer: 'Liam Torres',    barber: 'John',   service: 'Classic Haircut', date: '2026-02-24', time: '10:00 AM', status: 'completed' },
  { customer: 'Noah Williams',  barber: 'Mike',   service: 'Beard Trim',      date: '2026-02-24', time: '11:00 AM', status: 'pending'   },
  { customer: 'Ethan Brown',    barber: 'David',  service: 'Hot Towel Shave', date: '2026-02-24', time: '12:00 PM', status: 'pending'   },
  { customer: 'Mason Johnson',  barber: 'Carlos', service: 'Hair Coloring',   date: '2026-02-24', time: '01:00 PM', status: 'pending'   },
  { customer: 'Oliver Davis',   barber: 'Alex',   service: 'Kids Haircut',    date: '2026-02-24', time: '02:00 PM', status: 'cancelled' },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Barber.deleteMany({})
    await Service.deleteMany({})
    await Appointment.deleteMany({})
    console.log('🗑️  Cleared existing data')

    // Insert new data
    await Barber.insertMany(barbers)
    console.log(`👤 Seeded ${barbers.length} barbers`)

    await Service.insertMany(services)
    console.log(`✂️  Seeded ${services.length} services`)

    await Appointment.insertMany(appointments)
    console.log(`📅 Seeded ${appointments.length} appointments`)

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:', err.message)
    process.exit(1)
  }
}

seed()
