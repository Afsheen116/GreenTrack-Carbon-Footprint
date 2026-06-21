import React, { useState, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { calculateFootprint } from './utils/carbonCalculator'

const Calculator = lazy(() => import('./components/Calculator'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Tips = lazy(() => import('./components/Tips'))
const Goals = lazy(() => import('./components/Goals'))

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [result, setResult] = useState(null)
  const [inputs, setInputs] = useState(null)

  const handleCalculate = (values) => {
    const footprint = calculateFootprint(values)
    setResult(footprint)
    setInputs(values)
    setActiveTab('dashboard')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home onGetStarted={() => setActiveTab('calculator')} />
      case 'calculator':
        return <Calculator onCalculate={handleCalculate} />
      case 'dashboard':
        return (
          <Dashboard
            result={result}
            onRecalculate={() => setActiveTab('calculator')}
          />
        )
      case 'tips':
        return <Tips result={result} inputs={inputs} />
      case 'goals':
        return <Goals />
      default:
        return null
    }
  }

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <Suspense fallback={<div role="status" aria-live="polite" style={{ padding: '3rem', textAlign: 'center' }}>Loading…</div>}>
        {renderTab()}
      </Suspense>
    </>
  )
}