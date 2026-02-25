import { starsData } from '../data/starsData'
import { useLanguageStore } from '../stores/languageStore'
import type { Language } from '../stores/languageStore'
import { useNavigationStore } from '../stores/navigationStore'
import '../styles/StarDetails.css'
import { renderRichText } from '../util/util'
import { useState } from 'react'

const StarDetails: React.FC = () => {
  const { selectedStarId } = useNavigationStore()
  const { currentLanguage } = useLanguageStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const star = starsData.find(s => s.id === selectedStarId)
  if (!star) return null

  const content = star.content[currentLanguage as Language]
  const currentItem = content.items[currentIndex]

  const goToPrev = () => {
    setDirection('left')
    setCurrentIndex(prev => (prev - 1 + content.items.length) % content.items.length)
  }

  const goToNext = () => {
    setDirection('right')
    setCurrentIndex(prev => (prev + 1) % content.items.length)
  }

  return (
    <div className="star-details-container">
      {/* Header */}
      <div className="star-details-header">
        <div className="star-header">
          <h2>{star.title[currentLanguage]}</h2>
          <span className="star-code">{star.code}</span>
        </div>
        <div className="star-description">{renderRichText(content.description)}</div>
      </div>

      {/* Main content: card + optional image */}
      <div className="star-details">
        <div className={`star-card ${direction}`} key={currentIndex}>
          <div className="card-nav">
            <button onClick={goToPrev}>←</button>
            <span className="card-index">
              {currentIndex + 1} / {content.items.length}
            </span>
            <button onClick={goToNext}>→</button>
          </div>

          <h3>{currentItem.title}</h3>
          {currentItem.subtitle && (
            <h4 className="star-subtitle">{currentItem.subtitle}</h4>
          )}
          <div className="star-description">
            {renderRichText(currentItem.description)}
          </div>

          <div className="star-links">
            {currentItem.links.map((link, i) => (
              <a
                key={i}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text} →
              </a>
            ))}
          </div>
        </div>

        {/* Right image panel */}
        {star.texture && (
          <div className="star-image-panel">
            <img src={star.texture} alt={star.title[currentLanguage]} />
            {/* Optional: keep your scanline effects */}
            <div className="scanline-overlay" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StarDetails
