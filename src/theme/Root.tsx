import React, { ReactNode } from 'react';
import { CommandPrefixProvider } from '@site/src/context/CommandPrefixContext';

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return <CommandPrefixProvider>{children}</CommandPrefixProvider>;
}
