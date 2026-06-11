import React from 'react'
import styles from './Home.module.css'

const stats = [
  { value: '4.7t', label: 'Global avg CO₂/year' },
  { value: '1.9t', label: 'India avg CO₂/year' },
  { value: '30714', label: 'Participants tracking' },
]

const features = [
  { icon: '📊', title: 'Track your footprint', desc: 'Input daily habits across transport, energy, food, and shopping.' },
  { icon: '🤖', title: 'AI-powered insights', desc: 'Get personalized reduction tips based on your actual data.' },
  { icon: '🎯', title: 'Set and achieve goals', desc: 'Build sustainable habits with actionable weekly goals.' },
]

export default function Home({ onGetStarted }) {
  return (
    <main id="main" className={styles.page} tabIndex="-1">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBadge}>🌍 Carbon Footprint Awareness Platform</div>
        <h1 id="hero-title" className={styles.heroTitle}>
          Understand your impact.<br />
          <span className={styles.heroAccent}>Act on what matters.</span>
        </h1>
        <p className={styles.heroSub}>
          Calculate your annual carbon footprint, see exactly where your emissions come from,
          and get AI-personalized tips to reduce them — starting today.
        </p>
        <button
          className={styles.ctaBtn}
          onClick={onGetStarted}
          aria-label="Get started with the carbon footprint calculator"
        >
          Calculate my footprint →
        </button>

        <div className={styles.statsRow} aria-label="Key statistics">
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title" className={styles.featuresTitle}>How it works</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <article key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.featureCardTitle}>{f.title}</h3>
              <p className={styles.featureCardDesc}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
