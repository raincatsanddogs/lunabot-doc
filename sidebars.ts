import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '项目介绍',
    },
    {
      type: 'doc',
      id: 'quick-start',
      label: '快速入门',
    },
    {
      type: 'category',
      label: '基础通用',
      collapsed: false,
      items: [
        'general/general',
        'general/alive',
        'general/broadcast',
        'general/cron',
      ],
    },
    {
      type: 'category',
      label: '游戏专区',
      collapsed: false,
      items: [
        'games/haruki',
        'games/sekai',
        'games/mc',
      ],
    },
    {
      type: 'category',
      label: '多媒体与图像',
      collapsed: false,
      items: [
        'media/imgtool',
        'media/imgexp',
        'media/gallery',
        'media/paste_emoji',
      ],
    },
    {
      type: 'category',
      label: '智能与娱乐',
      collapsed: false,
      items: [
        'entertainment/chat',
        'entertainment/bird',
        'entertainment/code',
        'entertainment/math',
        'entertainment/random',
        'entertainment/repeater',
        'entertainment/water',
      ],
    },
    {
      type: 'category',
      label: '管理运维',
      collapsed: false,
      items: [
        'management/record',
        'management/sta',
        'management/welcome',
      ],
    },
  ],
};

export default sidebars;
