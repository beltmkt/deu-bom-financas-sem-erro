import React from 'react';
import './InsightCard.css';

export function InsightCard({
  icon = 'Dica',
  text = '',
  type = 'info',
  action = null,
  onAction = () => {},
}) {
  return (
    <div className={`insight-card insight-card--${type}`}>
      <div className="insight-card__content">
        <span className="insight-card__icon">{icon}</span>
        <p className="insight-card__text">{text}</p>
      </div>

      {action && (
        <button className="insight-card__action" onClick={onAction} title={action}>
          {action} {'>'}
        </button>
      )}
    </div>
  );
}

export default InsightCard;
