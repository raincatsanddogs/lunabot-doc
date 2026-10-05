import React, { useState, useRef, useEffect, ReactNode } from 'react';
import clsx from 'clsx';
import { useCommandPrefix } from '@site/src/context/CommandPrefixContext';
import styles from './styles.module.css';

const PRESETS = [
  { label: '/ (标准)', value: '/' },
  { label: '# (群聊)', value: '#' },
  { label: '! (感叹)', value: '!' },
  { label: '. (点号)', value: '.' },
  { label: '无前缀', value: '' },
];

interface Props {
  mobile?: boolean;
  className?: string;
  onClick?: () => void;
  position?: 'left' | 'right';
  [key: string]: unknown;
}

export default function PrefixNavbarItem({ mobile = false, className }: Props): ReactNode {
  const { prefix, setPrefix, isMounted } = useCommandPrefix();
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobile) return; // 移动端侧边抽屉手风琴不需要 clickOutside 监听
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobile]);

  const currentLabel = !isMounted
    ? '#'
    : prefix === ''
    ? '无'
    : prefix;

  // 渲染选项面板主体内容（预设按钮与自定义输入）
  const renderPanelContent = (isMobileView = false) => (
    <>
      <div className={styles.presetGrid}>
        {PRESETS.map((item) => (
          <button
            key={item.value}
            className={`${styles.chip} ${prefix === item.value ? styles.chipActive : ''}`}
            onClick={() => {
              setPrefix(item.value);
              if (!isMobileView) {
                setIsOpen(false);
              }
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.customRow}>
        <input
          type="text"
          className={styles.customInput}
          placeholder="自定义前缀 (如 %)"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && customInput.trim()) {
              setPrefix(customInput.trim());
              if (!isMobileView) {
                setIsOpen(false);
              }
            }
          }}
        />
        <button
          className={`${styles.chip} ${styles.chipActive}`}
          style={{ padding: '0.3rem 0.6rem' }}
          onClick={() => {
            if (customInput.trim()) {
              setPrefix(customInput.trim());
              if (!isMobileView) {
                setIsOpen(false);
              }
            }
          }}
          type="button"
        >
          应用
        </button>
      </div>
    </>
  );

  // 移动端侧边抽屉展示（手风琴形式，符合 Infima menu 规范）
  if (mobile) {
    return (
      <li className={clsx('menu__list-item', !isOpen && 'menu__list-item--collapsed')}>
        <div className="menu__list-item-collapsible">
          <a
            href="#"
            role="button"
            className={clsx('menu__link', styles.mobileMenuLink, className)}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            <span className={styles.mobileTitle}>指令前缀设定</span>
            <span className={styles.activeTag}>{currentLabel}</span>
            <span className={clsx(styles.arrow, isOpen && styles.arrowOpen)}>▼</span>
          </a>
        </div>
        {isOpen && (
          <div className={styles.mobilePanel}>
            {renderPanelContent(true)}
            <div className={styles.popoverFooter}>
              全站文档示例与标记均自动同步该前缀并保存偏好。
            </div>
          </div>
        )}
      </li>
    );
  }

  // 桌面端顶栏展示
  return (
    <div className={clsx('navbar__item', styles.wrapper, className)} ref={wrapperRef}>
      <button
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="点击切换全站指令前缀"
        type="button"
        aria-expanded={isOpen}
      >
        <span className={styles.prefixLabel}>前缀:</span>
        <span className={styles.activeTag}>{currentLabel}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.popoverTitle}>
            <span>全局指令前缀切换</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>全站即时生效</span>
          </div>

          {renderPanelContent(false)}

          <div className={styles.popoverFooter}>
            切换后全站文档示例代码块与指令标记均自动同步为该前缀，并记住偏好。
          </div>
        </div>
      )}
    </div>
  );
}
