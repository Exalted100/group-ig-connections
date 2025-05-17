import React from 'react';

function Results({ data }) {
  const { mutuals, fans, celebs } = data;

  const renderList = (items, title, description) => (
    <div className="result-section">
      <h3>
        <div className="category-header">
          <span className="category-title">{title}</span>
          <span className="category-count">{items.length}</span>
        </div>
        <div className="category-description">{description}</div>
      </h3>
      <div className="list-container">
        {items.map((item, index) => (
          <a
            key={index}
            href={`https://instagram.com/${item.label}`}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            {index + 1} - {item.label}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="results">
      <div className="results-grid">
        {renderList(mutuals, 'Mutual Followers', 'Both follow each other')}
        {renderList(fans, 'Fans', 'Follow you but you don\'t follow back')}
        {renderList(celebs, 'Celebs', 'You follow but they don\'t follow back')}
      </div>
    </div>
  );
}

export default Results; 