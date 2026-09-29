import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'LunaBot',
  tagline: '面向群聊与 PJSK 玩家的多功能助手，支持查卡看榜、群聊互动与日常工具',
  favicon: 'img/favicon.ico',

  // 部署配置：支持通过环境变量 BASE_URL 动态修改（便于切换自定义域名与 GitHub Pages）
  url: 'https://raincatsanddogs.github.io',
  baseUrl: process.env.BASE_URL || '/lunabot-doc/',
  organizationName: 'raincatsanddogs',
  projectName: 'lunabot-doc',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/raincatsanddogs/lunabot-doc/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        searchBarPosition: 'right',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'LunaBot 文档',
      logo: {
        alt: 'LunaBot Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '指令手册',
        },
        {
          to: '/docs/quick-start',
          label: '快速入门',
          position: 'left',
        },
        {
          type: 'custom-prefixSwitcher',
          position: 'right',
        },
        {
          href: 'https://github.com/raincatsanddogs/lunabot',
          label: 'Bot 源码',
          position: 'right',
        },
        {
          href: 'https://github.com/raincatsanddogs/lunabot-doc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档指南',
          items: [
            {
              label: '快速入门',
              to: '/docs/quick-start',
            },
            {
              label: '基础指令',
              to: '/docs/general',
            },
            {
              label: '娱乐聊天',
              to: '/docs/entertainment/chat',
            },
          ],
        },
        {
          title: '相关社区项目',
          items: [
            {
              label: 'MoeSekai',
              href: 'https://pjsekai.moe',
            },
            {
              label: 'Haruki工具箱',
              href: 'https://haruki.seiunx.com/',
            },
            {
              label: 'Sekai Viewer',
              href: 'https://sekai.best/',
            },
          ],
        },
        {
          title: '代码仓库',
          items: [
            {
              label: 'LunaBot GitHub',
              href: 'https://github.com/raincatsanddogs/lunabot',
            },
            {
              label: '文档站 GitHub',
              href: 'https://github.com/raincatsanddogs/lunabot-doc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} doveoverthere. Built with Docusaurus. <br>此网站与SEGA、Colorful Palette Inc. 以及 Crypton Future Media, INC. 均无任何关联。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
