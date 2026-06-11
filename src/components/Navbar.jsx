import React from 'react'
import styles from './Navbar.module.css'

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tips', label: 'Tips & Actions' },
  { id: 'goals', label: 'Goals' },
]

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <a href="#main" className={styles.skipLink}>Skip to main content</a>

        <div className={styles.brand} aria-label="GreenTrack home">
          <span className={styles.brandIcon} aria-hidden="true">🌿</span>
          <span className={styles.brandName}>GreenTrack</span>
        </div>

        <nav aria-label="Main navigation">
          <ul className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} role="none">
                <button
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                  onClick={() => onTabChange(tab.id)}
                  id={`tab-${tab.id}`}
                  aria-controls={`panel-${tab.id}`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
