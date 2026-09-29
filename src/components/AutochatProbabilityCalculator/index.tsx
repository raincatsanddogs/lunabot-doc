import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type TriggerMode = 'ambient' | 'followup' | 'direct';

interface KeywordItem {
  keyword: string;
  delta: number;
}

const DEFAULT_KEYWORDS: KeywordItem[] = [
  { keyword: 'enana', delta: 0.1 },
  { keyword: '慧敏敏', delta: -0.007 },
  { keyword: '闭嘴', delta: -1.0 },
];

const PRESET_SAMPLES = [
  { label: '正向词加成', text: '早上好，enana！', mode: 'ambient' as TriggerMode },
  { label: '负向词抑制', text: '慧敏敏也觉得大家应该早点休息', mode: 'ambient' as TriggerMode },
  { label: '多词复合叠加', text: 'enana 和 慧敏敏 都在讨论这次的活动', mode: 'ambient' as TriggerMode },
  { label: '强阻断词拦截', text: '不要吵了，大家都给我闭嘴！', mode: 'ambient' as TriggerMode },
  { label: '直接呼叫 (@Bot)', text: '你好呀，请问你在吗？', mode: 'direct' as TriggerMode },
  { label: '互动跟进', text: '好呀好呀，我们接着聊', mode: 'followup' as TriggerMode },
];

export default function AutochatProbabilityCalculator(): ReactNode {
  const [selectedMode, setSelectedMode] = useState<TriggerMode>('ambient');
  const [inputText, setInputText] = useState<string>('早上好，enana！');
  const [ambientP, setAmbientP] = useState<number>(0.008); // 0.8%
  const [followupP, setFollowupP] = useState<number>(0.85); // 85%
  const [keywords, setKeywords] = useState<KeywordItem[]>(DEFAULT_KEYWORDS);

  // 折叠自定义面板
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [newKeyword, setNewKeyword] = useState<string>('');
  const [newDelta, setNewDelta] = useState<string>('0.05');

  // 计算逻辑
  const calculation = useMemo(() => {
    const textLower = inputText.toLowerCase();
    const matched: KeywordItem[] = [];

    for (const item of keywords) {
      if (item.keyword && textLower.includes(item.keyword.toLowerCase())) {
        matched.push(item);
      }
    }

    const hardBlocked = matched.some((m) => m.delta <= -1.0);
    const keywordDelta = matched.reduce((sum, m) => sum + m.delta, 0);

    let baseP = 0;
    if (selectedMode === 'direct') {
      baseP = 1.0;
    } else if (selectedMode === 'followup') {
      baseP = followupP;
    } else {
      baseP = ambientP;
    }

    let finalP = 0;
    if (hardBlocked) {
      finalP = 0.0;
    } else if (selectedMode === 'direct') {
      finalP = 1.0;
    } else {
      finalP = Math.max(0.0, Math.min(1.0, baseP + keywordDelta));
    }

    return {
      matched,
      hardBlocked,
      keywordDelta,
      baseP,
      finalP,
    };
  }, [inputText, selectedMode, ambientP, followupP, keywords]);

  const formatPercent = (val: number, decimals: number = 1): string => {
    return `${(val * 100).toFixed(decimals)}%`;
  };

  const handleAddKeyword = () => {
    const kw = newKeyword.trim();
    const delta = parseFloat(newDelta);
    if (!kw || isNaN(delta)) return;

    // 如果已存在则更新，否则新增
    setKeywords((prev) => {
      const existing = prev.findIndex((item) => item.keyword.toLowerCase() === kw.toLowerCase());
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { keyword: kw, delta };
        return next;
      }
      return [...prev, { keyword: kw, delta }];
    });
    setNewKeyword('');
    setNewDelta('0.05');
  };

  const handleDeleteKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((item) => item.keyword !== kw));
  };

  const handleResetKeywords = () => {
    setKeywords(DEFAULT_KEYWORDS);
    setAmbientP(0.008);
    setFollowupP(0.85);
  };

  // 进度条样式
  const progressPercent = Math.max(0, Math.min(100, calculation.finalP * 100));
  let barColorClass = styles.barNormal;
  if (calculation.hardBlocked) {
    barColorClass = styles.barBlocked;
  } else if (calculation.finalP >= 0.7) {
    barColorClass = styles.barHigh;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>🎲 回复概率模拟器</span>
        </div>
      </div>

      {/* 1. 触发场景选择 */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>1. 选择当前对话场景</span>
        </div>
        <div className={styles.modeButtonGroup}>
          <button
            type="button"
            className={`${styles.modeBtn} ${selectedMode === 'ambient' ? styles.modeBtnActive : ''}`}
            onClick={() => setSelectedMode('ambient')}
          >
            <span>💬 普通群聊 (ambient)</span>
            <span className={styles.modeBtnSub}>
              基础概率: {formatPercent(ambientP, 1)} (日常随缘插话)
            </span>
          </button>

          <button
            type="button"
            className={`${styles.modeBtn} ${selectedMode === 'followup' ? styles.modeBtnActive : ''}`}
            onClick={() => setSelectedMode('followup')}
          >
            <span>👥 互动跟进 (followup)</span>
            <span className={styles.modeBtnSub}>
              基础概率: {formatPercent(followupP, 1)} (先前互动用户发言)
            </span>
          </button>

          <button
            type="button"
            className={`${styles.modeBtn} ${selectedMode === 'direct' ? styles.modeBtnActive : ''}`}
            onClick={() => setSelectedMode('direct')}
          >
            <span>🎯 直接呼叫 (@Bot / 回复)</span>
            <span className={styles.modeBtnSub}>
              基准概率: 100% (直接艾特或回复 Bot)
            </span>
          </button>
        </div>
      </div>

      {/* 2. 模拟消息输入与快捷样例 */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>
          <span>2. 模拟群聊消息文本</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.textInput}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入群内出现的聊天文本，测试关键词匹配与触发概率..."
          />

          <div className={styles.sampleChips}>
            <span className={styles.chipLabel}>快捷测试样例:</span>
            {PRESET_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className={styles.sampleChip}
                onClick={() => {
                  setInputText(sample.text);
                  setSelectedMode(sample.mode);
                }}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 关键词匹配展示 */}
      <div className={styles.matchesArea}>
        <div className={styles.sectionLabel} style={{ marginBottom: '0.25rem' }}>
          <span>🔍 关键词扫描结果</span>
        </div>
        {calculation.matched.length === 0 ? (
          <div className={styles.noMatchText}>当前消息未命中任何配置关键词（关键词增量为 0%）</div>
        ) : (
          <div className={styles.matchesList}>
            {calculation.matched.map((item) => {
              const isBlock = item.delta <= -1.0;
              const isPositive = item.delta > 0;
              const tagClass = isBlock
                ? styles.tagBlocked
                : isPositive
                ? styles.tagPositive
                : styles.tagNegative;

              return (
                <span key={item.keyword} className={`${styles.matchTag} ${tagClass}`}>
                  <span>{item.keyword}</span>
                  <span>
                    {isBlock
                      ? '≤ -1.0 (强阻断)'
                      : `${isPositive ? '+' : ''}${formatPercent(item.delta, 1)}`}
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. 演算结果与进度条 */}
      <div className={styles.resultCard}>
        <div className={styles.resultTop}>
          <div className={styles.resultTitle}>
            {calculation.hardBlocked && '🛑 触发状态: 强阻断静默 (Hard Blocked)'}
            {!calculation.hardBlocked && selectedMode === 'direct' && '🎯 触发状态: 直接呼叫响应 (Direct 100%)'}
            {!calculation.hardBlocked && selectedMode === 'followup' && '💬 触发状态: 互动专注跟进 (Followup)'}
            {!calculation.hardBlocked && selectedMode === 'ambient' && '🎲 触发状态: 随缘闲聊插话 (Ambient)'}
          </div>
          <div
            className={styles.resultRate}
            style={{
              color: calculation.hardBlocked
                ? '#ef4444'
                : calculation.finalP >= 0.7
                ? '#22c55e'
                : 'var(--ifm-color-primary)',
            }}
          >
            {formatPercent(calculation.finalP, 2)}
          </div>
        </div>

        {/* 概率可视化条 */}
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${barColorClass}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 详细计算公式拆解 */}
        {calculation.hardBlocked ? (
          <div className={`${styles.formulaBox} ${styles.blockedFormula}`}>
            🚫 命中强阻断关键词（加成 ≤ -1.0）：最终概率强制置为 0.00%
            （即使直接 @Bot 或引用回复也会被完全屏蔽）
          </div>
        ) : selectedMode === 'direct' ? (
          <div className={styles.formulaBox}>
            🎯 直接呼叫模式（未被强屏蔽）：最终概率直接锁定为 100.00%
          </div>
        ) : (
          <div className={styles.formulaBox}>
            计算公式：基础概率 ({formatPercent(calculation.baseP, 1)}) + 关键词加成 (
            {calculation.keywordDelta >= 0 ? '+' : ''}
            {formatPercent(calculation.keywordDelta, 1)}) = 最终概率{' '}
            <strong>{formatPercent(calculation.finalP, 2)}</strong>
            {calculation.baseP + calculation.keywordDelta < 0 && '（已下限截断至 0%）'}
            {calculation.baseP + calculation.keywordDelta > 1.0 && '（已上限截断至 100%）'}
          </div>
        )}

        <p className={styles.noteText}>
          💡 <strong>机制说明</strong>：
          若因正向关键词唤醒并回复，Bot 会将发言人自动加入注意力名单，后续其发言的基础触发概率为 85% 。
        </p>
      </div>

      {/* 5. 折叠自定义配置面板 */}
      <button
        type="button"
        className={styles.toggleConfigBtn}
        onClick={() => setShowConfig(!showConfig)}
      >
        <span>{showConfig ? '▼ 收起参数与词库调优' : '▶ 展开参数与词库调优 (自定义测试)'}</span>
      </button>

      {showConfig && (
        <div className={styles.configPanel}>
          <div className={styles.configGrid}>
            <div className={styles.configItem}>
              <label className={styles.configLabel}>
                普通群聊基础概率 (ambient_p): {formatPercent(ambientP, 1)}
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="1"
                className={styles.configInput}
                value={ambientP}
                onChange={(e) => setAmbientP(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className={styles.configItem}>
              <label className={styles.configLabel}>
                互动跟进基础概率 (followup_p): {formatPercent(followupP, 1)}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                className={styles.configInput}
                value={followupP}
                onChange={(e) => setFollowupP(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <div className={styles.configLabel} style={{ marginBottom: '0.35rem' }}>
              关键词加成词典配置 (加成 ≤ -1.0 为强阻断)
            </div>
            <table className={styles.keywordsTable}>
              <thead>
                <tr>
                  <th>关键词</th>
                  <th>概率增量 (小数/百分比)</th>
                  <th>状态效果</th>
                  <th style={{ width: '60px' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((item) => (
                  <tr key={item.keyword}>
                    <td>
                      <code>{item.keyword}</code>
                    </td>
                    <td>{formatPercent(item.delta, 2)} ({item.delta})</td>
                    <td>
                      {item.delta <= -1.0 ? (
                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>强阻断屏蔽 (强制 0%)</span>
                      ) : item.delta > 0 ? (
                        <span style={{ color: '#22c55e' }}>提升唤醒概率 (+转跟进)</span>
                      ) : (
                        <span style={{ color: '#f97316' }}>降低回复意愿</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.tableActionBtn}
                        onClick={() => handleDeleteKeyword(item.keyword)}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 新增关键词表单 */}
            <div className={styles.addKeywordRow}>
              <input
                type="text"
                className={styles.addKeywordInput}
                placeholder="新增关键词 (如: 名字/话题)"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                className={styles.addKeywordInput}
                placeholder="权重 (如 0.2 或 -0.5 或 -1.0)"
                value={newDelta}
                onChange={(e) => setNewDelta(e.target.value)}
              />
              <button type="button" className={styles.addBtn} onClick={handleAddKeyword}>
                添加 / 更新
              </button>
              <button type="button" className={styles.resetBtn} onClick={handleResetKeywords}>
                恢复默认词库
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
