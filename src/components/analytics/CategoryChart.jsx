import React from 'react';
import './CategoryChart.css';

/**
 * CategoryChart - Gráfico de categorias (Pizza/Donut)
 * 
 * Props:
 *   - data: array de { category, amount, color }
 *   - type: 'pie' ou 'donut' (default: 'pie')
 *   - emptyMessage: mensagem quando vazio
 * 
 * Exemplo:
 * <CategoryChart
 *   data={[
 *     { category: 'Comida', amount: 350, color: '#F97316' },
 *     { category: 'Transporte', amount: 250, color: '#3B82F6' },
 *   ]}
 *   type="pie"
 * />
 */

export function CategoryChart({ data = [], type = 'pie', emptyMessage = 'Sem dados' }) {
  if (!data || data.length === 0) {
    return <div className="category-chart category-chart--empty">{emptyMessage}</div>;
  }

  // Calcular total
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  
  // Calcular ângulos e posições
  const items = data.map((item, idx) => {
    const percentage = (item.amount / total) * 100;
    const angle = (item.amount / total) * 360;
    return { ...item, percentage, angle };
  });

  // Gerar slice de pizza usando CSS/path
  const radius = 45;
  const center = 50;
  
  let currentAngle = 0;
  const slices = items.map((item, idx) => {
    const sliceAngle = item.angle;
    const isLarge = sliceAngle > 180 ? 1 : 0;
    const start = currentAngle;
    const end = currentAngle + sliceAngle;

    // Converter ângulos para radianos
    const startRad = (start * Math.PI) / 180;
    const endRad = (end * Math.PI) / 180;

    // Pontos do arco
    const x1 = center + radius * Math.cos(startRad - Math.PI / 2);
    const y1 = center + radius * Math.sin(startRad - Math.PI / 2);
    const x2 = center + radius * Math.cos(endRad - Math.PI / 2);
    const y2 = center + radius * Math.sin(endRad - Math.PI / 2);

    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${isLarge} 1 ${x2} ${y2} Z`;

    const textAngle = start + sliceAngle / 2;
    const textRad = (textAngle * Math.PI) / 180;
    const textRadius = radius * (type === 'donut' ? 0.65 : 0.6);
    const textX = center + textRadius * Math.cos(textRad - Math.PI / 2);
    const textY = center + textRadius * Math.sin(textRad - Math.PI / 2);

    currentAngle = end;

    return {
      path,
      color: item.color,
      percentage: item.percentage,
      textX,
      textY,
      label: item.category,
      amount: item.amount,
    };
  });

  return (
    <div className="category-chart">
      <div className="category-chart__svg-wrapper">
        <svg viewBox="0 0 100 100" className="category-chart__svg">
          {/* Donut hole (se type = 'donut') */}
          {type === 'donut' && (
            <circle 
              cx="50" 
              cy="50" 
              r="20" 
              fill="var(--color-bg, #0F172A)"
            />
          )}

          {/* Slices */}
          {slices.map((slice, idx) => (
            <g key={idx}>
              <path
                d={slice.path}
                fill={slice.color}
                className="category-chart__slice"
              />
              {/* Percentual no slice */}
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

      {/* Legenda */}
      <div className="category-chart__legend">
        {items.map((item, idx) => (
          <div key={idx} className="category-chart__legend-item">
            <span 
              className="category-chart__legend-dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="category-chart__legend-label">
              {item.category}
            </span>
            <span className="category-chart__legend-amount">
              R$ {item.amount.toFixed(2)}
            </span>
            <span className="category-chart__legend-percent">
              ({item.percentage.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="category-chart__total">
        <span>Total:</span>
        <strong>R$ {total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CategoryChart;
