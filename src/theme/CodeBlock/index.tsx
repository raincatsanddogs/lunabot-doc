import React, { ReactNode } from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import { useCommandPrefix } from '@site/src/context/CommandPrefixContext';

// 明确排除非指令的编程与配置文件语言
const EXCLUDED_LANGUAGES = new Set([
  'bash', 'sh', 'shell', 'zsh',
  'yaml', 'yml',
  'json', 'jsonc',
  'typescript', 'ts', 'tsx',
  'javascript', 'js', 'jsx',
  'python', 'py',
  'css', 'scss', 'html',
  'mermaid', 'diff',
]);

export default function CodeBlockWrapper(props: any): ReactNode {
  const { adaptText, isMounted } = useCommandPrefix();

  const className = props.className || '';
  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1].toLowerCase() : '';

  if (EXCLUDED_LANGUAGES.has(lang)) {
    return <CodeBlock {...props} />;
  }

  let rawContent: string | null = null;
  if (typeof props.children === 'string') {
    rawContent = props.children;
  } else if (Array.isArray(props.children) && props.children.every((c: any) => typeof c === 'string')) {
    rawContent = props.children.join('');
  }

  if (rawContent === null) {
    return <CodeBlock {...props} />;
  }

  const contentToRender = isMounted ? adaptText(rawContent) : rawContent;

  return <CodeBlock {...props}>{contentToRender}</CodeBlock>;
}
