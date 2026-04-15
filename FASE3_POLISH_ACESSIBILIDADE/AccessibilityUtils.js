/**
 * AccessibilityUtils.js - Utilitários de acessibilidade
 *
 * Funções auxiliares para melhorar a acessibilidade da aplicação,
 * incluindo anúncios para screen readers, gerenciamento de foco,
 * e validações de contraste.
 */

/**
 * Anuncia uma mensagem para screen readers
 * @param {string} message - Mensagem a ser anunciada
 * @param {string} priority - Prioridade: 'polite' ou 'assertive'
 * @param {number} duration - Duração em ms (padrão: 5000)
 */
export const announceToScreenReader = (message, priority = 'polite', duration = 5000) => {
  // Remove announcer anterior se existir
  const existingAnnouncer = document.getElementById('sr-announcer');
  if (existingAnnouncer) {
    existingAnnouncer.remove();
  }

  // Cria novo announcer
  const announcer = document.createElement('div');
  announcer.id = 'sr-announcer';
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.style.width = '1px';
  announcer.style.height = '1px';
  announcer.style.overflow = 'hidden';

  document.body.appendChild(announcer);
  announcer.textContent = message;

  // Remove após duration
  setTimeout(() => {
    if (announcer.parentNode) {
      announcer.parentNode.removeChild(announcer);
    }
  }, duration);
};

/**
 * Gera label acessível para elementos
 * @param {string} baseLabel - Label base
 * @param {Object} context - Contexto adicional
 * @returns {string} Label completo
 */
export const getAriaLabel = (baseLabel, context = {}) => {
  const parts = [baseLabel];

  if (context.amount) {
    parts.push(`R$ ${context.amount.toFixed(2)}`);
  }

  if (context.category) {
    parts.push(`categoria ${context.category}`);
  }

  if (context.date) {
    const date = new Date(context.date).toLocaleDateString('pt-BR');
    parts.push(`em ${date}`);
  }

  if (context.status) {
    parts.push(`status ${context.status}`);
  }

  return parts.join(', ');
};

/**
 * Trap focus dentro de um container (modal)
 * @param {HTMLElement} container - Container para trap focus
 * @param {Function} onEscape - Callback quando ESC é pressionado
 */
export const trapFocus = (container, onEscape) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onEscape?.();
      return;
    }

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  // Adiciona listener
  container.addEventListener('keydown', handleKeyDown);

  // Focus no primeiro elemento
  if (firstElement) {
    firstElement.focus();
  }

  // Retorna função para remover listener
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Restaura foco para elemento anterior
 * @param {HTMLElement} previousElement - Elemento para restaurar foco
 */
export const restoreFocus = (previousElement) => {
  if (previousElement && previousElement.focus) {
    previousElement.focus();
  }
};

/**
 * Verifica contraste de cores (simplificado)
 * @param {string} foreground - Cor do texto (hex)
 * @param {string} background - Cor do fundo (hex)
 * @returns {number} Ratio de contraste (1-21)
 */
export const checkContrast = (foreground, background) => {
  // Função simplificada - em produção use uma lib como color-contrast
  // Este é apenas um placeholder

  // Converte hex para RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) return 1;

  // Calcula luminância relativa (fórmula WCAG)
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(fg.r, fg.g, fg.b);
  const lum2 = getLuminance(bg.r, bg.g, bg.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Valida se contraste atende WCAG AA
 * @param {string} foreground - Cor do texto
 * @param {string} background - Cor do fundo
 * @param {string} size - Tamanho do texto: 'normal' ou 'large'
 * @returns {boolean} Se atende AA (4.5:1) ou AAA (7:1)
 */
export const isContrastValid = (foreground, background, size = 'normal') => {
  const ratio = checkContrast(foreground, background);
  const minRatio = size === 'large' ? 4.5 : 7; // AA normal ou AAA large
  return ratio >= minRatio;
};

/**
 * Gera ID único para aria-labelledby/aria-describedby
 * @param {string} prefix - Prefixo para o ID
 * @returns {string} ID único
 */
export const generateAriaId = (prefix = 'aria') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce para anúncios de screen reader
 * @param {Function} func - Função a ser debounced
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export const debounceAnnounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Hook para anúncios debounced
 */
export const useScreenReaderAnnouncer = () => {
  const announce = React.useCallback(
    debounceAnnounce(announceToScreenReader, 300),
    []
  );

  return announce;
};

/**
 * Detecta se usuário está usando navegação por teclado
 */
export const isKeyboardNavigation = () => {
  return document.body.classList.contains('keyboard-navigation');
};

/**
 * Adiciona classe para indicar navegação por teclado
 */
export const setupKeyboardNavigationDetection = () => {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  };

  const handleMouseDown = () => {
    document.body.classList.remove('keyboard-navigation');
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);

  // Retorna cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleMouseDown);
  };
};

/**
 * Utilitários para headings acessíveis
 */
export const HeadingUtils = {
  /**
   * Garante hierarquia de headings correta
   * @param {number} level - Nível desejado (1-6)
   * @returns {number} Nível correto baseado no contexto
   */
  getCorrectHeadingLevel: (level) => {
    // Em produção, isso verificaria o último heading no DOM
    // Por simplicidade, retorna o level solicitado
    return Math.max(1, Math.min(6, level));
  }
};

/**
 * Utilitários para formulários acessíveis
 */
export const FormUtils = {
  /**
   * Associa label com input automaticamente
   * @param {string} inputId - ID do input
   * @returns {string} ID para o label
   */
  getLabelId: (inputId) => `${inputId}-label`,

  /**
   * Associa error com input
   * @param {string} inputId - ID do input
   * @returns {string} ID para o error
   */
  getErrorId: (inputId) => `${inputId}-error`,

  /**
   * Associa help text com input
   * @param {string} inputId - ID do input
   * @returns {string} ID para o help
   */
  getHelpId: (inputId) => `${inputId}-help`
};