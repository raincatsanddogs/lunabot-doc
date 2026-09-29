import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1.2rem'}}>
          <img
            src="img/logo.svg"
            alt="LunaBot Logo"
            style={{width: '96px', height: '96px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'}}
          />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={styles.btnPrimary}
            to="/docs">
            查阅指令手册
          </Link>
          <Link
            className={styles.btnSecondary}
            to="/docs/quick-start">
            快速入门
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="面向群聊与 PJSK 玩家的多功能助手，支持查卡看榜、群聊互动与日常工具">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
