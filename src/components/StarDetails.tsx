// src/components/StarDetails.tsx
import React from 'react';
import { useNavigationStore } from '../stores/navigationStore';
import { useLanguageStore, Language } from '../stores/languageStore';
import { starsData } from '../data/starsData';
import '../styles/StarDetails.css';

const StarDetails: React.FC = () => {
  const { selectedStarId } = useNavigationStore();
  const { currentLanguage } = useLanguageStore();

  const star = starsData.find((s) => s.id === selectedStarId);

  if (!star) return null;

  const content = star.content[currentLanguage as Language];
  const title = star.title[currentLanguage as Language];

  return (
    <div className="star-details">
      <div className="star-header">
        <h2>{title}</h2>
        <span className="star-code">{star.code}</span>
      </div>
      <p className="star-description">{content.description}</p>
      <div className="star-items">
        {content.items.map((item, index) => (
          <div key={index} className="star-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.links.map(link => <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.text} →
              </a>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarDetails;