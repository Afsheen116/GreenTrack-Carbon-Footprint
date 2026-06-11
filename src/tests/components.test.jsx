import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../components/Home'
import Goals from '../components/Goals'
import Dashboard from '../components/Dashboard'

describe('Home component', () => {
  it('renders the main heading', () => {
    render(<Home onGetStarted={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })

  it('calls onGetStarted when CTA button is clicked', () => {
    const mockFn = vi.fn()
    render(<Home onGetStarted={mockFn} />)
    const btn = screen.getByRole('button', { name: /get started with the carbon footprint calculator/i })
    fireEvent.click(btn)
    expect(mockFn).toHaveBeenCalledOnce()
  })

  it('renders stats section', () => {
    render(<Home onGetStarted={vi.fn()} />)
    expect(screen.getByText(/global avg/i)).toBeTruthy()
  })
})

describe('Goals component', () => {
  it('renders all default goals', () => {
    render(<Goals />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBeGreaterThanOrEqual(6)
  })

  it('toggles a goal when checkbox is clicked', () => {
    render(<Goals />)
    const checkboxes = screen.getAllByRole('button', { name: /mark/i })
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows progress percentage', () => {
    render(<Goals />)
    expect(screen.getByText(/0 of 6 completed/i)).toBeTruthy()
  })
})

describe('Dashboard component', () => {
  it('shows empty state when no result', () => {
    render(<Dashboard result={null} onRecalculate={vi.fn()} />)
    expect(screen.getByText(/no data yet/i)).toBeTruthy()
  })

  it('renders results when result is provided', () => {
    const mockResult = {
      total: 3.5,
      breakdown: {
        transport: 1.5,
        flights: 0.5,
        electricity: 0.6,
        gas: 0.2,
        food: 0.4,
        shopping: 0.3,
      },
    }
    render(<Dashboard result={mockResult} onRecalculate={vi.fn()} />)
    expect(screen.getByText('3.5')).toBeTruthy()
  })
})
