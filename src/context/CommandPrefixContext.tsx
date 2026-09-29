import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CommandPrefixContextType {
  prefix: string;
  setPrefix: (prefix: string) => void;
  adaptText: (text: string) => string;
  isMounted: boolean;
}

const STORAGE_KEY = 'lunabot_doc_prefix';
const DEFAULT_PREFIX = '#'; // 默认推荐前缀（与 LunaBot example_config 保持一致）

const CommandPrefixContext = createContext<CommandPrefixContextType>({
  prefix: DEFAULT_PREFIX,
  setPrefix: () => {},
  adaptText: (text: string) => text,
  isMounted: false,
});

export function adaptCommandText(text: string, targetPrefix: string): string {
  if (targetPrefix === '/' || !text) {
    return text;
  }
  // 替换在空白、反引号、括号、引号或冒号后面的 /xxx 指令（支持常规指令、英文/中文/占位符如 <>, [], {}, 【】）
  const pattern = /(?<=[\s`\(\)（）\"\'“”‘’:：])\/(?=[a-zA-Z0-9_\u4e00-\u9fa5\[<{【])/g;
  // 替换在行首的 /xxx 指令（支持多行）
  const lineStartPattern = /(?<=^|\n)\/(?=[a-zA-Z0-9_\u4e00-\u9fa5\[<{【])/g;

  return text
    .replace(lineStartPattern, targetPrefix)
    .replace(pattern, targetPrefix);
}

export function CommandPrefixProvider({ children }: { children: ReactNode }) {
  const [prefix, setPrefixState] = useState<string>(DEFAULT_PREFIX);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setPrefixState(saved);
      }
    } catch {
      // 忽略隐私模式或限制环境下的存储异常
    }
  }, []);

  const setPrefix = (newPrefix: string) => {
    setPrefixState(newPrefix);
    try {
      localStorage.setItem(STORAGE_KEY, newPrefix);
    } catch {
      // 忽略存储异常
    }
  };

  // 全局搜索弹窗 (Ctrl+K) 智能前缀归一化拦截
  useEffect(() => {
    if (!isMounted || prefix === '/') return;

    const handleSearchInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target || target.tagName !== 'INPUT') return;

      // 检测是否为搜索输入框
      const isSearchInput =
        target.classList.contains('navbar__search-input') ||
        target.classList.contains('aa-Input') ||
        target.getAttribute('type') === 'search' ||
        target.getAttribute('aria-label')?.includes('搜索') ||
        target.getAttribute('placeholder')?.includes('搜索');

      if (isSearchInput && target.value) {
        const val = target.value;
        // 如果用户以前缀字符开头输入（例如 #查卡 或 !查卡）
        if (prefix && val.startsWith(prefix) && val.length > prefix.length) {
          const stripped = val.slice(prefix.length).trim();
          // 如果剥离前缀后是普通中英文字符，则自动转换为标准 / 或纯词查询以匹配静态索引
          if (/^[a-zA-Z0-9_\u4e00-\u9fa5]/.test(stripped)) {
            // 给输入框设置规范查询词并触发输入事件
            target.value = `/${stripped}`;
            target.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      }
    };

    document.addEventListener('input', handleSearchInput, true);
    return () => {
      document.removeEventListener('input', handleSearchInput, true);
    };
  }, [isMounted, prefix]);

  const adaptText = (text: string): string => {
    if (!isMounted) {
      return text;
    }
    return adaptCommandText(text, prefix);
  };

  return (
    <CommandPrefixContext.Provider value={{ prefix, setPrefix, adaptText, isMounted }}>
      {children}
    </CommandPrefixContext.Provider>
  );
}

export function useCommandPrefix(): CommandPrefixContextType {
  return useContext(CommandPrefixContext);
}
