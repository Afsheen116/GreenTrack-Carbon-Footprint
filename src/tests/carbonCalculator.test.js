import { describe, it, expect } from 'vitest'
import {
  calculateFootprint,
  calculateScore,
  getScoreRating,
  getStaticTips,
} from '../utils/carbonCalculator'

const sampleInputs = {
  car: 20,
  flights: 2,
  electricity: 200,
  gas: 1,
  meat: 5,
  clothes: 2,
}

describe('calculateFootprint', () => {
  it('returns a total and breakdown object', () => {
    const result = calculateFootprint(sampleInputs)
    expect(result).toHaveProperty('total')
    expect(result).toHaveProperty('breakdown')
  })

  it('total is sum of all breakdown values', () => {
    const { total, breakdown } = calculateFootprint(sampleInputs)
    const sum = Object.values(breakdown).reduce((a, b) => a + b, 0)
    expect(Math.abs(total - sum)).toBeLessThan(0.05)
  })

  it('returns zero total when all inputs are 0', () => {
    const zero = { car: 0, flights: 0, electricity: 0, gas: 0, meat: 0, clothes: 0 }
    const { total } = calculateFootprint(zero)
    expect(total).toBe(0)
  })

  it('higher car usage results in higher transport emission', () => {
    const low = calculateFootprint({ ...sampleInputs, car: 5 })
    const high = calculateFootprint({ ...sampleInputs, car: 100 })
    expect(high.breakdown.transport).toBeGreaterThan(low.breakdown.transport)
  })

  it('all breakdown values are non-negative', () => {
    const { breakdown } = calculateFootprint(sampleInputs)
    Object.values(breakdown).forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0)
    })
  })
})

describe('calculateScore', () => {
  it('returns a number between 0 and 100', () => {
    const score = calculateScore(4.7)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('lower footprint gives higher score', () => {
    const lowScore = calculateScore(1)
    const highScore = calculateScore(8)
    expect(lowScore).toBeGreaterThan(highScore)
  })

  it('zero footprint gives score of 100', () => {
    expect(calculateScore(0)).toBe(100)
  })

  it('very high footprint gives score of 0', () => {
    expect(calculateScore(999)).toBe(0)
  })
})

describe('getScoreRating', () => {
  it('returns label and color for any score', () => {
    const rating = getScoreRating(75)
    expect(rating).toHaveProperty('label')
    expect(rating).toHaveProperty('color')
  })

  it('score 90 is "Excellent"', () => {
    expect(getScoreRating(90).label).toBe('Excellent')
  })

  it('score 10 gives "Very high"', () => {
    expect(getScoreRating(10).label).toBe('Very high')
  })
})

describe('getStaticTips', () => {
  it('returns an array of tips', () => {
    const { breakdown } = calculateFootprint(sampleInputs)
    const tips = getStaticTips(breakdown)
    expect(Array.isArray(tips)).toBe(true)
    expect(tips.length).toBeGreaterThan(0)
  })

  it('each tip has title, desc, and icon', () => {
    const { breakdown } = calculateFootprint(sampleInputs)
    const tips = getStaticTips(breakdown)
    tips.forEach((tip) => {
      expect(tip).toHaveProperty('title')
      expect(tip).toHaveProperty('desc')
      expect(tip).toHaveProperty('icon')
    })
  })
})
