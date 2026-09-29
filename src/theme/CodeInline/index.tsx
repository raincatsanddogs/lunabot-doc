import React, { ReactNode } from 'react';
import CodeInline from '@theme-original/CodeInline';
import { useCommandPrefix } from '@site/src/context/CommandPrefixContext';

export default function CodeInlineWrapper(props: any): ReactNode {
  const { adaptText, isMounted } = useCommandPrefix();
  const children = props.children;

  if (isMounted && typeof children === 'string') {
    // 判定是否符合指令语法特征：行首或空格、括号、@Bot 后的 /xxx 指令（支持常规指令、中文及 <>, [], {}, 【】 占位符）
    const isCommandPattern = /(?:^|[\s\(\)（）]|@Bot\s+)\/(?:[a-zA-Z0-9_\u4e00-\u9fa5\[<{【])/.test(children);
    if (isCommandPattern) {
      return <CodeInline {...props}>{adaptText(children)}</CodeInline>;
    }
  }

  return <CodeInline {...props} />;
}
