import React, { useState } from 'react'
import styles from './Goals.module.css'

const DEFAULT_GOALS = [
  { id: 'g1', text: 'Walk or cycle for all trips under 2 km this week', category: 'Transport' },
  { id: 'g2', text: 'Unplug all standby appliances before sleeping', category: 'Energy' },
  { id: 'g3', text: 'Have at least 3 plant-based meals this week', category: 'Food' },
  { id: 'g4', text: 'Avoid buying any new clothing this month', category: 'Shopping' },
  { id: 'g5', text: 'Research solar water heater options for your home', category: 'Energy' },
  { id: 'g6', text: 'Use public transport or carpool at least 2 days this week', category: 'Transport' },
]

const categoryColors = {
  Transport: styles.catGreen,
  Energy:    styles.catAmber,
  Food:      styles.catTeal,
  Shopping:  styles.catPurple,
}

export default function Goals() {
  const [completed, setCompleted] = useState(new Set())

  const toggle = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const pct = Math.round((completed.size / DEFAULT_GOALS.length) * 100)

  return (
    <main id="main" className={styles.page} tabIndex="-1">
      <h1 className={styles.title}>Your action goals</h1>
      <p className={styles.subtitle}>Small habits make a big difference over time.</p>

      <div className={styles.progress} aria-label={`${completed.size} of ${DEFAULT_GOALS.length} goals completed`}>
        <div className={styles.progressTop}>
          <span className={styles.progressLabel}>
            {completed.size} of {DEFAULT_GOALS.length} completed
          </span>
          <span className={styles.progressPct}>{pct}%</span>
        </div>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={completed.size}
          aria-valuemin={0}
          aria-valuemax={DEFAULT_GOALS.length}
          aria-valuetext={`${completed.size} of ${DEFAULT_GOALS.length} goals completed`}
        >
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        {completed.size === DEFAULT_GOALS.length && (
          <p className={styles.allDone} role="status">
            🎉 Amazing! You&apos;ve completed all goals this week!
          </p>
        )}
      </div>

      <ul className={styles.goalList} aria-label="Weekly sustainability goals">
        {DEFAULT_GOALS.map((goal) => {
          const done = completed.has(goal.id)
          return (
            <li key={goal.id} className={`${styles.goalItem} ${done ? styles.done : ''}`}>
              <button
                className={`${styles.checkbox} ${done ? styles.checked : ''}`}
                onClick={() => toggle(goal.id)}
                aria-pressed={done}
                aria-label={`Mark "${goal.text}" as ${done ? 'incomplete' : 'complete'}`}
              >
                {done && <span aria-hidden="true">✓</span>}
              </button>
              <div className={styles.goalContent}>
                <p className={`${styles.goalText} ${done ? styles.strikethrough : ''}`}>
                  {goal.text}
                </p>
                <span className={`${styles.category} ${categoryColors[goal.category] || ''}`}>
                  {goal.category}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
