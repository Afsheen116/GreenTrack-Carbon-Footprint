import { useState, useCallback } from 'react'

/**
 * Custom hook to fetch AI-powered tips from Claude API
 * Uses VITE_ANTHROPIC_API_KEY from .env
 */
export function useAITips() {
  const [tips, setTips] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTips = useCallback(async (inputs, breakdown, total) => {
    setLoading(true)
    setError(null)

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      setError('API key not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.')
      setLoading(false)
      return
    }

    const topCategory = Object.entries(breakdown)
      .sort((a, b) => b[1] - a[1])[0][0]

    const prompt = `You are a practical sustainability coach. A user has calculated their carbon footprint.

Their profile:
- Car travel: ${inputs.car} km/day
- Flights: ${inputs.flights} per year  
- Electricity: ${inputs.electricity} kWh/month
- Gas/LPG: ${inputs.gas} units/month
- Meat meals: ${inputs.meat} per week
- New clothes: ${inputs.clothes} items/month
- Total annual footprint: ${total} tonnes CO2
- Biggest emission source: ${topCategory}

Give exactly 3 personalized, specific, actionable tips to reduce their footprint. 
Each tip must directly address their actual numbers.
Format your response as JSON only — no markdown, no extra text:
{
  "tips": [
    { "title": "short title", "description": "2-sentence specific advice", "saving": "estimated saving e.g. ~0.3 tonnes/year", "category": "category name" },
    { "title": "...", "description": "...", "saving": "...", "category": "..." },
    { "title": "...", "description": "...", "saving": "...", "category": "..." }
  ]
}`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data.content?.[0]?.text || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setTips(parsed.tips)
    } catch (err) {
      setError('Could not load AI tips. Check your API key or try again later.')
      console.error('AI tips error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setTips(null)
    setError(null)
  }, [])

  return { tips, loading, error, fetchTips, reset }
}
