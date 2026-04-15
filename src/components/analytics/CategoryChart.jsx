import React from 'react';
import './CategoryChart.css';

export function CategoryChart({ data = [], type = 'pie', emptyMessage = 'Sem dados' }) {
  if (!data || data.length === 0) {
    return <div className="category-chart category-chart--empty">{emptyMessage}</div>;
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const items = data.map((item) => ({
    ...item,
    percentage: (item.amount / total) * 100,
    angle: (item.amount / total) * 360,
  }));

  const radius = 45;
  const center = 50;

  const slices = items.reduce(
    (acc, item) => {
      const sliceAngle = item.angle;
      const isLarge = sliceAngle > 180 ? 1 : 0;
      const start = acc.nextAngle;
      const end = acc.nextAngle + sliceAngle;

      const startRad = (start * Math.PI) / 180;
      const endRad = (end * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad - Math.PI / 2);
      const y1 = center + radius * Math.sin(startRad - Math.PI / 2);
      const x2 = center + radius * Math.cos(endRad - Math.PI / 2);
      const y2 = center + radius * Math.sin(endRad - Math.PI / 2);

      const textAngle = start + sliceAngle / 2;
      const textRad = (textAngle * Math.PI) / 180;
      const textRadius = radius * (type === 'donut' ? 0.65 : 0.6);

      acc.slices.push({
        path: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${isLarge} 1 ${x2} ${y2} Z`,
        color: item.color,
        percentage: item.percentage,
        textX: center + textRadius * Math.cos(textRad - Math.PI / 2),
        textY: center + textRadius * Math.sin(textRad - Math.PI / 2),
      });

      acc.nextAngle = end;
      return acc;
    },
    { nextAngle: 0, slices: [] }
  ).slices;

  return (
    <div className="category-chart">
      <div className="category-chart__svg-wrapper">
        <svg viewBox="0 0 100 100" className="category-chart__svg">
          {type === 'donut' && <circle cx="50" cy="50" r="20" fill="var(--color-bg, #0F172A)" />}

          {slices.map((slice, index) => (
            <g key={`${slice.color}-${index}`}>
              <path d={slice.path} fill={slice.color} className="category-chart__slice" />
              {slice.percentage > 8 && (
                <text
                  x={slice.textX}
                  y={slice.textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="category-chart__slice-label"
                >
                  {Math.round(slice.percentage)}%
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="category-chart__legend">
        {items.map((item) => (
          <div key={item.category} className="category-chart__legend-item">
            <span
              className="category-chart__legend-dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="category-chart__legend-label">{item.category}</span>
            <span className="category-chart__legend-amount">R$ {item.amount.toFixed(2)}</span>
            <span className="category-chart__legend-percent">
              ({item.percentage.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>

      <div className="category-chart__total">
        <span>Total:</span>
        <strong>R$ {total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CategoryChart;
