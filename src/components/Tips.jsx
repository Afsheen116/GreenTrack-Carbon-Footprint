import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getStaticTips } from '../utils/carbonCalculator'
import { useAITips } from '../hooks/useAITips'
import styles from './Tips.module.css'

const impactColors = {
  'High impact': styles.badgeRed,
  'Medium impact': styles.badgeAmber,
  'Low impact': styles.badgeGreen,
}

export default function Tips({ result = null, inputs = null }) {
  const [aiRequested, setAiRequested] = useState(false)
  const { tips: aiTips, loading, error, fetchTips } = useAITips()

  const staticTips = useMemo(() => {
    if (!result) return []
    return getStaticTips(result.breakdown)
  }, [result])

  const handleGetAITips = () => {
    setAiRequested(true)
    fetchTips(inputs, result.breakdown, result.total)
  }

  if (!result) {
    return (
      <main id="main" className={styles.page} tabIndex="-1">
        <div className={styles.empty}>
          <span aria-hidden="true" className={styles.emptyIcon}>💡</span>
          <p className={styles.emptyText}>Calculate your footprint first to get personalized tips.</p>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className={styles.page} tabIndex="-1">
      <h1 className={styles.title}>Tips & actions</h1>
      <p className={styles.subtitle}>Practical ways to reduce your {result.total} tonnes/year footprint.</p>

      <section aria-labelledby="static-tips-title">
        <h2 id="static-tips-title" className={styles.sectionTitle}>Top recommendations for your profile</h2>
        <div className={styles.tipGrid}>
          {staticTips.map((tip) => (
            <article key={tip.title} className={styles.tipCard}>
              <span className={styles.tipIcon} aria-hidden="true">{tip.icon}</span>
              <span className={`${styles.badge} ${impactColors[tip.impact] || styles.badgeGreen}`}>
                {tip.impact}
              </span>
              <h3 className={styles.tipTitle}>{tip.title}</h3>
              <p className={styles.tipDesc}>{tip.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aiSection} aria-labelledby="ai-tips-title">
        <div className={styles.aiHeader}>
          <h2 id="ai-tips-title" className={styles.sectionTitle}>AI-personalized insights</h2>
          <p className={styles.aiSubtitle}>
            Claude analyzes your exact numbers and gives specific advice tailored to your lifestyle.
          </p>
        </div>

        {!aiRequested && (
          <button
            className={styles.aiBtn}
            onClick={handleGetAITips}
            aria-label="Get AI-powered personalized tips based on your footprint data"
          >
            🤖 Get my AI tips
          </button>
        )}

        {loading && (
          <div className={styles.loading} role="status" aria-live="polite" aria-busy="true">
            <span className={styles.spinner} aria-hidden="true" />
            Analyzing your footprint...
          </div>
        )}

        {error && (
          <div className={styles.error} role="alert">
            <strong>Could not load AI tips.</strong> {error}
          </div>
        )}

        {aiTips && (
          <div className={styles.aiTipsGrid} aria-label="AI-generated personalized tips">
            {aiTips.map((tip) => (
              <article key={tip.title} className={styles.aiTipCard}>
                <div className={styles.aiTipHeader}>
                  <h3 className={styles.aiTipTitle}>{tip.title}</h3>
                  <span className={styles.saving} aria-label={`Estimated saving: ${tip.saving}`}>
                    {tip.saving}
                  </span>
                </div>
                <p className={styles.aiTipDesc}>{tip.description}</p>
                <span className={styles.aiTipCategory}>{tip.category}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

Tips.propTypes = {
  result: PropTypes.shape({
    breakdown: PropTypes.objectOf(PropTypes.number).isRequired,
    total: PropTypes.number.isRequired,
  }),
  inputs: PropTypes.objectOf(PropTypes.number),
}
