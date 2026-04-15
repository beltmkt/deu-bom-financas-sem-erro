import React from 'react';
import './BottomNav.css';

/**
 * BottomNav - Navegação inferior com 3 abas
 * 
 * Usado em: Todas as páginas
 * Props:
 *   - active: qual aba está ativa ('home' | 'transactions' | 'analytics')
 *   - onNavigate: callback (page) => void
 * 
 * Exemplo:
 * <BottomNav 
 *   active="home"
 *   onNavigate={(page) => navigate(`/${page}`)}
 * />
 */

export function BottomNav({ active = 'home', onNavigate = () => {} }) {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      ariaLabel: 'Home - Visão geral',
    },
    {
      id: 'transactions',
      label: 'Transações',
      icon: '📋',
      ariaLabel: 'Transações - Gestão de movimentos',
    },
    {
      id: 'analytics',
      label: 'Análise',
      icon: '📊',
      ariaLabel: 'Análise - Insights e gráficos',
    },
  ];

  return (
    <nav 
      className="bottom-nav"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="bottom-nav__container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`bottom-nav__tab ${
              active === tab.id ? 'bottom-nav__tab--active' : ''
            }`}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.ariaLabel}
            aria-current={active === tab.id ? 'page' : undefined}
            title={tab.label}
          >
            <span className="bottom-nav__icon">{tab.icon}</span>
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Spacer para que content não fique coberto por esta nav */}
      <div className="bottom-nav__spacer" />
    </nav>
  );
}

export default BottomNav;
