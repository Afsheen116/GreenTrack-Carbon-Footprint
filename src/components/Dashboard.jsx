import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { GLOBAL_AVERAGE_TONNES, INDIA_AVERAGE_TONNES, calculateScore, getScoreRating } from '../utils/carbonCalculator'
import styles from './Dashboard.module.css'

const categoryMeta = {
  transport:   { label: 'Car travel',    icon: '🚗', color: '#16a34a' },
  flights:     { label: 'Flights',       icon: '✈️', color: '#0d9488' },
  electricity: { label: 'Electricity',   icon: '⚡', color: '#d97706' },
  gas:         { label: 'Gas / LPG',     icon: '🔥', color: '#ea580c' },
  food:        { label: 'Food (meat)',   icon: '🍖', color: '#dc2626' },
  shopping:    { label: 'Shopping',      icon: '👕', color: '#7c3aed' },
}

export default function Dashboard({ result = null, onRecalculate }) {
  const sortedBreakdown = useMemo(() => {
    if (!result) return []
    return Object.entries(result.breakdown).sort((a, b) => b[1] - a[1])
  }, [result])

  const maxVal = useMemo(() => {
    if (!result) return 0
    return Math.max(...Object.values(result.breakdown))
  }, [result])

  if (!result) {
    return (
      <main id="main" className={styles.page} tabIndex="-1">
        <div className={styles.empty}>
          <span aria-hidden="true" className={styles.emptyIcon}>📊</span>
          <h1 className={styles.emptyTitle}>No data yet</h1>
          <p className={styles.emptySub}>Use the calculator to see your personalized dashboard.</p>
          <button className={styles.actionBtn} onClick={onRecalculate}>Go to calculator →</button>
        </div>
      </main>
    )
  }

  const { total } = result
  const score = calculateScore(total)
  const rating = getScoreRating(score)
  const circumference = 2 * Math.PI * 52
  const dashOffset = circumference * (1 - score / 100)
  const vsGlobal = Number((((total - GLOBAL_AVERAGE_TONNES) / GLOBAL_AVERAGE_TONNES) * 100).toFixed(0))
  const vsIndia = Number((((total - INDIA_AVERAGE_TONNES) / INDIA_AVERAGE_TONNES) * 100).toFixed(0))

  return (
    <main id="main" className={styles.page} tabIndex="-1">
      <div className={styles.topRow}>
        <div>
          <h1 className={styles.title}>Your carbon dashboard</h1>
          <p className={styles.subtitle}>Based on your daily habits</p>
        </div>
        <button className={styles.recalcBtn} onClick={onRecalculate} aria-label="Recalculate your footprint">
          ↩ Recalculate
        </button>
      </div>

      <div className={styles.metricsGrid} role="list" aria-label="Key metrics">
        <div className={styles.metricCard} role="listitem">
          <span className={styles.metricLabel}>Annual CO₂</span>
          <span className={styles.metricValue}>{total}</span>
          <span className={styles.metricUnit}>tonnes / year</span>
        </div>
        <div className={styles.metricCard} role="listitem">
          <span className={styles.metricLabel}>Monthly CO₂</span>
          <span className={styles.metricValue}>{Math.round(total * 1000 / 12)}</span>
          <span className={styles.metricUnit}>kg / month</span>
        </div>
        <div
          className={styles.metricCard}
          role="listitem"
          style={{ '--metric-color': vsGlobal > 0 ? '#dc2626' : '#16a34a' }}
        >
          <span className={styles.metricLabel}>vs Global avg</span>
          <span className={styles.metricValue} style={{ color: 'var(--metric-color)' }}>
            {vsGlobal > 0 ? '+' : ''}{vsGlobal}%
          </span>
          <span className={styles.metricUnit}>{GLOBAL_AVERAGE_TONNES}t average</span>
        </div>
        <div
          className={styles.metricCard}
          role="listitem"
          style={{ '--metric-color': vsIndia > 0 ? '#dc2626' : '#16a34a' }}
        >
          <span className={styles.metricLabel}>vs India avg</span>
          <span className={styles.metricValue} style={{ color: 'var(--metric-color)' }}>
            {vsIndia > 0 ? '+' : ''}{vsIndia}%
          </span>
          <span className={styles.metricUnit}>{INDIA_AVERAGE_TONNES}t average</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card} aria-labelledby="breakdown-title">
          <h2 id="breakdown-title" className={styles.cardTitle}>Emissions by category</h2>
          <div className={styles.bars} role="list">
            {sortedBreakdown
              .map(([key, val]) => {
                const meta = categoryMeta[key]
                const pct = maxVal > 0 ? Math.round((val / maxVal) * 100) : 0
                return (
                  <div key={key} className={styles.barRow} role="listitem">
                    <span className={styles.barLabel} aria-hidden="true">
                      {meta.icon} {meta.label}
                    </span>
                    <span className="sr-only">{meta.label}</span>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${pct}%`, background: meta.color }}
                        role="img"
                        aria-label={`${val} tonnes, ${pct}% of highest category`}
                      />
                    </div>
                    <span className={styles.barVal}>{val.toFixed(2)}t</span>
                  </div>
                )
              })}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="score-title">
          <h2 id="score-title" className={styles.cardTitle}>Sustainability score</h2>
          <div className={styles.scoreWrap}>
            <svg
              width="140" height="140"
              viewBox="0 0 120 120"
              role="img"
              aria-label={`Sustainability score: ${score} out of 100. Rating: ${rating.label}`}
            >
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={rating.color} strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
              <text x="60" y="55" textAnchor="middle" fontSize="26" fontWeight="700" fill={rating.color}>
                {score}
              </text>
              <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#6b7280">
                out of 100
              </text>
            </svg>
            <p className={styles.scoreRating} style={{ color: rating.color }}>
              {rating.label}
            </p>
            <p className={styles.scoreNote}>
              Score based on comparison to global average of {GLOBAL_AVERAGE_TONNES} tonnes/year
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

Dashboard.propTypes = {
  result: PropTypes.shape({
    breakdown: PropTypes.objectOf(PropTypes.number).isRequired,
    total: PropTypes.number.isRequired,
  }),
  onRecalculate: PropTypes.func.isRequired,
}
