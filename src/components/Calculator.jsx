import React, { useState } from 'react'
import styles from './Calculator.module.css'

const fields = [
  {
    id: 'car',
    label: 'Car travel',
    unit: 'km/day',
    min: 0, max: 200, step: 1, defaultVal: 20,
    icon: '🚗',
    hint: 'Average daily distance driven',
  },
  {
    id: 'flights',
    label: 'Flights',
    unit: 'per year',
    min: 0, max: 30, step: 1, defaultVal: 2,
    icon: '✈️',
    hint: 'Number of return flights per year',
  },
  {
    id: 'electricity',
    label: 'Electricity usage',
    unit: 'kWh/month',
    min: 0, max: 1000, step: 10, defaultVal: 200,
    icon: '⚡',
    hint: 'Check your electricity bill',
  },
  {
    id: 'gas',
    label: 'Gas / LPG',
    unit: 'cylinders/month',
    min: 0, max: 10, step: 1, defaultVal: 1,
    icon: '🔥',
    hint: 'Number of LPG cylinders used',
  },
  {
    id: 'meat',
    label: 'Meat meals',
    unit: 'per week',
    min: 0, max: 21, step: 1, defaultVal: 5,
    icon: '🍖',
    hint: 'Meals containing chicken, mutton, beef, or fish',
  },
  {
    id: 'clothes',
    label: 'New clothing',
    unit: 'items/month',
    min: 0, max: 20, step: 1, defaultVal: 2,
    icon: '👕',
    hint: 'New garments purchased on average',
  },
]

export default function Calculator({ onCalculate }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.id, f.defaultVal]))
  )

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(values)
  }

  return (
    <main id="main" className={styles.page} tabIndex="-1">
      <div className={styles.header}>
        <h1 className={styles.title}>Calculate your footprint</h1>
        <p className={styles.subtitle}>Adjust the sliders to match your typical habits. We'll calculate your annual CO₂ emissions.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Carbon footprint calculator">
        <div className={styles.grid}>
          {fields.map((field) => (
            <div key={field.id} className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <label htmlFor={field.id} className={styles.fieldLabel}>
                  <span aria-hidden="true">{field.icon}</span> {field.label}
                </label>
                <output
                  htmlFor={field.id}
                  className={styles.fieldValue}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {values[field.id]} {field.unit}
                </output>
              </div>
              <input
                type="range"
                id={field.id}
                name={field.id}
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={styles.slider}
                aria-label={`${field.label}: ${values[field.id]} ${field.unit}`}
                aria-valuemin={field.min}
                aria-valuemax={field.max}
                aria-valuenow={values[field.id]}
                aria-valuetext={`${values[field.id]} ${field.unit}`}
              />
              <p className={styles.hint}>{field.hint}</p>
            </div>
          ))}
        </div>

        <button type="submit" className={styles.calcBtn}>
          Calculate my footprint →
        </button>
      </form>
    </main>
  )
}
