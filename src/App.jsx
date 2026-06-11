import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Calculator from './components/Calculator'
import Dashboard from './components/Dashboard'
import Tips from './components/Tips'
import Goals from './components/Goals'
import { calculateFootprint } from './utils/carbonCalculator'

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
      {renderTab()}
    </>
  )
}
