/**
 * Carbon emission factors (kg CO2 equivalent)
 * Sources: IPCC, EPA, Carbon Trust
 */
export const EMISSION_FACTORS = {
  car: 0.21,        // kg CO2 per km (average petrol car)
  flight: 255,      // kg CO2 per flight (avg domestic/short-haul)
  electricity: 0.82, // kg CO2 per kWh (India grid average)
  gas: 2.2,         // kg CO2 per LPG unit (kg)
  meat: 3.3,        // kg CO2 per meat meal
  clothes: 20,      // kg CO2 per new clothing item
}

export const GLOBAL_AVERAGE_TONNES = 4.7 // tonnes CO2/year world average
export const INDIA_AVERAGE_TONNES = 1.9  // tonnes CO2/year India average

/**
 * Calculate annual carbon footprint in tonnes CO2
 * @param {Object} inputs - User activity inputs
 * @returns {Object} Breakdown and total in tonnes
 */
export function calculateFootprint(inputs) {
  const { car, flights, electricity, gas, meat, clothes } = inputs

  const breakdown = {
    transport: parseFloat(((car * 365 * EMISSION_FACTORS.car) / 1000).toFixed(3)),
    flights:   parseFloat(((flights * EMISSION_FACTORS.flight) / 1000).toFixed(3)),
    electricity: parseFloat(((electricity * 12 * EMISSION_FACTORS.electricity) / 1000).toFixed(3)),
    gas:       parseFloat(((gas * 12 * EMISSION_FACTORS.gas) / 1000).toFixed(3)),
    food:      parseFloat(((meat * 52 * EMISSION_FACTORS.meat) / 1000).toFixed(3)),
    shopping:  parseFloat(((clothes * 12 * EMISSION_FACTORS.clothes) / 1000).toFixed(3)),
  }

  const total = parseFloat(
    Object.values(breakdown).reduce((sum, v) => sum + v, 0).toFixed(2)
  )

  return { breakdown, total }
}

/**
 * Score 0-100 (higher = greener)
 * Based on comparison to global average
 */
export function calculateScore(totalTonnes) {
  const max = GLOBAL_AVERAGE_TONNES * 2
  const score = Math.max(0, Math.min(100, Math.round((1 - totalTonnes / max) * 100)))
  return score
}

/**
 * Returns a label and color for a given score
 */
export function getScoreRating(score) {
  if (score >= 80) return { label: 'Excellent', color: '#16a34a' }
  if (score >= 60) return { label: 'Good', color: '#4ade80' }
  if (score >= 40) return { label: 'Moderate', color: '#fbbf24' }
  if (score >= 20) return { label: 'High impact', color: '#f97316' }
  return { label: 'Very high', color: '#dc2626' }
}

/**
 * Static tip content, keyed by emission category.
 * Defined once at module scope to avoid re-allocating on every call.
 */
const TIP_CONTENT = {
  transport: {
    icon: '🚌',
    title: 'Try public transport or carpooling',
    desc: 'Switching to bus or metro even 3 days a week can cut your transport emissions by 30-40%.',
    impact: 'High impact',
  },
  flights: {
    icon: '🛤️',
    title: 'Choose trains over short flights',
    desc: 'A train emits up to 90% less CO2 than a flight for the same journey. Consider train travel for trips under 600 km.',
    impact: 'High impact',
  },
  electricity: {
    icon: '💡',
    title: 'Switch to LED and unplug standby devices',
    desc: 'LEDs use 75% less energy. Unplugging devices on standby can save 10% on your electricity bill.',
    impact: 'Medium impact',
  },
  gas: {
    icon: '☀️',
    title: 'Consider a solar water heater',
    desc: 'A solar water heater can replace 60-80% of your LPG usage for hot water, paying back in 3-4 years.',
    impact: 'Medium impact',
  },
  food: {
    icon: '🥗',
    title: 'Add 2 plant-based meals per week',
    desc: 'Replacing 2 meat meals per week with plant-based alternatives saves approx. 0.34 tonnes CO2 per year.',
    impact: 'High impact',
  },
  shopping: {
    icon: '♻️',
    title: 'Buy second-hand or repair before replacing',
    desc: 'The fashion industry produces 10% of global emissions. Thrifting one item saves ~20 kg CO2 on average.',
    impact: 'Medium impact',
  },
}

/**
 * Returns static tips based on the highest emission category
 */
export function getStaticTips(breakdown) {
  const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1])
  return sorted.map(([key]) => TIP_CONTENT[key]).filter(Boolean)
}
