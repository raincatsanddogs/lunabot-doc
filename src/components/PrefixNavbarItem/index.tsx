import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useCommandPrefix } from '@site/src/context/CommandPrefixContext';
import styles from './styles.module.css';

const PRESETS = [
  { label: '/ (标准)', value: '/' },
  { label: '# (群聊)', value: '#' },
  { label: '! (感叹)', value: '!' },
  { label: '. (点号)', value: '.' },
  { label: '无前缀', value: '' },
];

export default function PrefixNavbarItem(): ReactNode {
  const { prefix, setPrefix, isMounted } = useCommandPrefix();
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const currentLabel = !isMounted
    ? '#'
    : prefix === ''
    ? '无'
    : prefix;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="点击切换全站指令前缀"
        type="button"
        aria-expanded={isOpen}
      >
        <span>前缀:</span>
        <span className={styles.activeTag}>{currentLabel}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.popoverTitle}>
            <span>全局指令前缀切换</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>全站即时生效</span>
          </div>

          <div className={styles.presetGrid}>
            {PRESETS.map((item) => (
              <button
                key={item.value}
                className={`${styles.chip} ${prefix === item.value ? styles.chipActive : ''}`}
                onClick={() => {
                  setPrefix(item.value);
                  setIsOpen(false);
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
                  setIsOpen(false);
                }
              }}
            />
            <button
              className={`${styles.chip} ${styles.chipActive}`}
              style={{ padding: '0.3rem 0.6rem' }}
              onClick={() => {
                if (customInput.trim()) {
                  setPrefix(customInput.trim());
                  setIsOpen(false);
                }
              }}
              type="button"
            >
              应用
            </button>
          </div>

          <div className={styles.popoverFooter}>
            切换后全站文档示例代码块与指令标记均自动同步为该前缀，并记住偏好。
          </div>
        </div>
      )}
    </div>
  );
}
