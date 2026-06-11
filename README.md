# 🌿 GreenTrack — Carbon Footprint Awareness Platform

A smart, AI-powered web application that helps individuals **understand, track, and reduce their carbon footprint** through personalized insights and actionable goals.

Built for **PromptWars Virtual — Challenge 3** on Hack2Skill.

---

## 🚀 Live Demo

> Run locally — see setup instructions below.

---

## ✨ Features

- **Carbon Calculator** — 6-category slider-based input (transport, flights, electricity, gas, food, shopping)
- **Dashboard** — Visual breakdown with bar charts, sustainability score ring, and comparison to global/India averages
- **AI-Powered Tips** — Claude API analyzes your exact profile and generates 3 personalized, specific reduction strategies
- **Static Tips** — Rule-based recommendations ordered by your highest emission category
- **Goals Tracker** — 6 weekly actionable habits with progress tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules |
| AI | Anthropic Claude API (claude-sonnet-4) |
| Testing | Vitest + Testing Library |
| Linting | ESLint + jsx-a11y |

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/carbon-footprint-app.git
cd carbon-footprint-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
```

Get your API key from [console.anthropic.com](https://console.anthropic.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🧪 Running Tests

```bash
npm test
```

Tests cover:
- Carbon calculation logic (footprint, score, ratings, tips)
- Component rendering and interactions
- Edge cases (zero inputs, extreme values)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Accessible tab navigation
│   ├── Home.jsx            # Landing page
│   ├── Calculator.jsx      # Slider-based input form
│   ├── Dashboard.jsx       # Results visualization
│   ├── Tips.jsx            # Static + AI-powered tips
│   └── Goals.jsx           # Weekly habit tracker
├── hooks/
│   └── useAITips.js        # Claude API integration hook
├── utils/
│   └── carbonCalculator.js # Emission factors & calculations
├── tests/
│   ├── carbonCalculator.test.js
│   └── components.test.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## ♿ Accessibility

- Semantic HTML throughout (`main`, `nav`, `section`, `article`)
- ARIA roles, labels, and live regions
- Keyboard navigable — all interactive elements focusable
- Skip-to-content link
- `prefers-reduced-motion` respected
- Screen reader announcements on slider changes

---

## 🔒 Security

- API key stored in `.env` (never committed — see `.gitignore`)
- `.env.example` provided for safe onboarding
- No sensitive data stored client-side
- Input validation on all calculator fields

---

## 📊 Emission Factors Used

| Category | Factor | Source |
|---|---|---|
| Car travel | 0.21 kg CO₂/km | EPA / Carbon Trust |
| Flights | 255 kg CO₂/flight | IPCC |
| Electricity | 0.82 kg CO₂/kWh | India CEA grid average |
| Gas/LPG | 2.2 kg CO₂/unit | IPCC |
| Meat meals | 3.3 kg CO₂/meal | Oxford Food Study |
| Clothing | 20 kg CO₂/item | Textile Exchange |

---

## 👩‍💻 Author

**Afsheen Sheikh**  
BCA Student & React Intern  
Built for PromptWars Virtual Hackathon 2026
