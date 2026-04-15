/**
 * theme.js
 * Sistema de Design Global para Deu Bom!!
 * 
 * Este arquivo é o "source of truth" para:
 * - Cores
 * - Espaçamento
 * - Tipografia
 * - Breakpoints
 * - Sombras
 * - Bordas-raias
 * 
 * USO:
 * 1. Em CSS: var(--color-primary)
 * 2. Em JS: import { theme } from './theme'; theme.colors.primary
 * 3. Em Tailwind: Usar tokens customizados
 */

export const theme = {
  // ==================== CORES ====================
  colors: {
    // Brand - Azul violeta (primary)
    primary: '#575ECF',
    primaryLight: '#6B5EE8',
    primaryDark: '#4F52B8',
    
    // Semânticas (importante para fintech!)
    success: '#10B981', // Receita, ações positivas
    successLight: '#34D399',
    successDark: '#059669',
    
    warning: '#F59E0B', // Alertas, limites próximos
    warningLight: '#FCD34D',
    warningDark: '#D97706',
    
    danger: '#EF4444', // Gastos, ações destrutivas
    dangerLight: '#F87171',
    dangerDark: '#DC2626',
    
    info: '#3B82F6', // Informações
    infoLight: '#60A5FA',
    infoDark: '#1D4ED8',
    
    // Neutras (escala de cinza)
    neutral: '#6B7280',
    neutralLight: '#E5E7EB',
    neutralDark: '#374151',
    
    // Background (dark mode)
    bg: '#0F172A',
    bgSecondary: '#1E293B',
    bgTertiary: '#334155',
    
    // Surface (cards, containers)
    surface: '#1E293B',
    surfaceHover: '#334155',
    
    // Borders
    border: '#334155',
    borderLight: '#475569',
    
    // Text
    text: {
      primary: '#E2E8F0',
      secondary: '#CBD5E1',
      tertiary: '#94A3B8',
      disabled: '#64748B'
    },
    
    // Gradientes
    gradients: {
      primary: 'linear-gradient(135deg, #575ECF 0%, #4f52b8 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    }
  },

  // ==================== ESPAÇAMENTO ====================
  spacing: {
    xs: '4px', // Mini gaps
    sm: '8px', // Small gaps
    md: '16px', // Medium (default)
    lg: '24px', // Large sections
    xl: '32px', // Extra large
    '2xl': '48px', // Huge sections
    
    // Aliases (para ser mais claro)
    gutter: '16px', // Padding padrão de containers
    gap: '16px', // Gap padrão entre elementos
    radius: '12px', // Border-radius padrão
  },

  // ==================== TIPOGRAFIA ====================
  typography: {
    // Font families
    fontFamily: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      mono: '"Roboto Mono", "Courier New", monospace',
    },

    // Font sizes
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '28px',
      '4xl': '36px',
      '5xl': '48px',
    },

    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    // Letter spacing
    letterSpacing: {
      tight: '-0.5px',
      normal: '0px',
      wide: '0.5px',
      wider: '1px',
    },

    // Presets (para usar direto)
    presets: {
      h1: {
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-1px',
      },
      h2: {
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontSize: '28px',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.4,
        opacity: 0.7,
      },
    },
  },

  // ==================== BREAKPOINTS ====================
  breakpoints: {
    xs: '320px', // Phones mais antigos
    sm: '375px', // iPhone 6/7/8
    md: '640px', // Tablets pequenos
    lg: '1024px', // Tablets grandes
    xl: '1280px', // Desktop
    '2xl': '1536px', // Desktop grande
  },

  // ==================== SOMBRAS ====================
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    md: '0 8px 16px -2px rgba(0, 0, 0, 0.15)',
    lg: '0 12px 24px -4px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // ==================== BORDER-RADIUS ====================
  borderRadius: {
    none: '0',
    xs: '4px',
    sm: '6px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  // ==================== DURAÇÕES & EASING ====================
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
    
    // Easing functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ==================== ESTADOS ====================
  states: {
    // Transição padrão
    transition: (props = ['all']) => {
      return `${props.join(', ')} 200ms cubic-bezier(0.4, 0, 0.2, 1)`;
    },

    // Hover
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },

    // Active
    active: {
      transform: 'translateY(0)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },

    // Disabled
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    // Focus (acessibilidade)
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(87, 94, 207, 0.1), 0 0 0 3px #575ECF`,
    },
  },

  // ==================== ZINDEX ====================
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    dropdown: 1000,
    sticky: 1010,
    fixed: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050,
  },
};

// ==================== CSS VARIABLES ====================
// Gerar CSS variables automaticamente para usar em CSS puro

export const generateCSSVariables = () => {
  const variables = {};

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        variables[`--color-${key}-${subKey}`] = subValue;
      });
    } else {
      variables[`--color-${key}`] = value;
    }
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--space-${key}`] = value;
  });

  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    variables[`--font-weight-${key}`] = value;
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  // Transitions
  variables['--transition-fast'] = theme.transitions.fast;
  variables['--transition-base'] = theme.transitions.base;
  variables['--transition-slow'] = theme.transitions.slow;

  return variables;
};

// ==================== EXPORTAR COMO CSS STRING ====================
export const getCSSVariablesString = () => {
  const variables = generateCSSVariables();
  let cssString = ':root {\n';
  
  Object.entries(variables).forEach(([key, value]) => {
    cssString += `  ${key}: ${value};\n`;
  });
  
  cssString += '}';
  
  return cssString;
};

// ==================== HELPERS ====================

/**
 * Get spacing value
 * @param {string} size - xs | sm | md | lg | xl | 2xl
 */
export const getSpacing = (size) => theme.spacing[size] || theme.spacing.md;

/**
 * Get color value
 * @param {string} color - primary | success | danger | etc
 * @param {string} shade - light | dark (opcional)
 */
export const getColor = (color, shade = '') => {
  const colorObj = theme.colors[color];
  if (typeof colorObj === 'object') {
    return shade ? colorObj[shade] : Object.values(colorObj)[0];
  }
  return colorObj;
};

/**
 * Media query helper
 * @param {string} breakpoint - xs | sm | md | lg | xl | 2xl
 */
export const media = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  '2xl': `@media (min-width: ${theme.breakpoints['2xl']})`,
};

export default theme;
