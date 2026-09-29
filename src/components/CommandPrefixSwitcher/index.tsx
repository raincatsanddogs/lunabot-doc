import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useCommandPrefix } from '@site/src/context/CommandPrefixContext';
import styles from './styles.module.css';

const PRESET_PREFIXES = [
  { label: '/ (默认)', value: '/', desc: '/' },
  { label: '# (井号)', value: '#', desc: '#' },
  { label: '! (感叹号)', value: '!', desc: '!' },
  { label: '. (点号)', value: '.', desc: '.' },
  { label: '无前缀 (空)', value: '', desc: '' },
];

const SAMPLE_COMMANDS = [
  { canonical: '/help', label: '基础帮助' },
  { canonical: '/alive', label: '状态检测' },
  { canonical: '/sekai 查卡', label: 'PJSK 查卡' },
  { canonical: '@Bot /enable', label: '开启群聊' },
  { canonical: '(回复消息) /water', label: '水果检测' },
];

export default function CommandPrefixSwitcher(): ReactNode {
  const { prefix: selectedPrefix, setPrefix, adaptText, isMounted } = useCommandPrefix();
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    if (isMounted) {
      const isPreset = PRESET_PREFIXES.some(p => p.value === selectedPrefix);
      if (!isPreset) {
        setIsCustom(true);
        setCustomValue(selectedPrefix);
      } else {
        setIsCustom(false);
      }
    }
  }, [isMounted, selectedPrefix]);

  const handleSelectPrefix = (prefix: string) => {
    setPrefix(prefix);
    setIsCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    setPrefix(val);
    setIsCustom(true);
  };

  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(id);
      setTimeout(() => setCopiedText(null), 1500);
    }
  };

  const currentDesc = isCustom
    ? `自定义前缀：“${selectedPrefix}”`
    : PRESET_PREFIXES.find(p => p.value === selectedPrefix)?.desc || '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>🎮 指令前缀模拟</span>
          <span className={styles.badge}>此处更改会同步到全站文档</span>
        </div>
      </div>

      <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
        在此处切换或输入群内实际配置的前缀，<strong>文档中的代码块与指令示例将同步更新</strong>：
      </p>

      <div className={styles.btnGroup}>
        {PRESET_PREFIXES.map((preset) => (
          <button
            key={preset.value}
            className={`${styles.btn} ${!isCustom && selectedPrefix === preset.value ? styles.btnActive : ''}`}
            onClick={() => handleSelectPrefix(preset.value)}
            type="button"
          >
            {preset.label}
          </button>
        ))}

        <div className={styles.customInputWrapper}>
          <button
            className={`${styles.btn} ${isCustom ? styles.btnActive : ''}`}
            onClick={() => {
              setIsCustom(true);
              setPrefix(customValue);
            }}
            type="button"
          >
            自定义:
          </button>
          <input
            type="text"
            className={styles.customInput}
            placeholder="例如 %"
            value={customValue}
            onChange={handleCustomChange}
            onFocus={() => {
              setIsCustom(true);
              setPrefix(customValue);
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>
        💡 （右上角导航栏亦可随时切换）当前生效模式：{currentDesc}指令名
      </div>

      <div className={styles.previewGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>📖 文档标准记法</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)' }}>功能</span>
          </div>
          <div className={styles.cmdList}>
            {SAMPLE_COMMANDS.map((item) => (
              <div key={item.canonical} className={styles.cmdItem}>
                <span>{item.canonical}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>⚡ bot实际触发格式</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>
              当前前缀: <code>{selectedPrefix === '' ? '(无)' : selectedPrefix}</code>
            </span>
          </div>
          <div className={styles.cmdList}>
            {SAMPLE_COMMANDS.map((item) => {
              const converted = adaptText(item.canonical);
              return (
                <div key={item.canonical} className={`${styles.cmdItem} ${styles.cmdItemActive}`}>
                  <span>{converted}</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(converted, item.canonical)}
                    type="button"
                  >
                    {copiedText === item.canonical ? '已复制 ✓' : '复制'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
