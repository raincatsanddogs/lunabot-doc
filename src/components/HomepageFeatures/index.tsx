import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'PJSK 与游戏查询',
    image: require('@site/static/img/chara_icons/miku.png').default,
    description: (
      <>
        五大区服查卡、查曲、查曲绘，活动榜线与时速追踪，还有抓包数据解析。
      </>
    ),
  },
  {
    title: '群聊日常与整活',
    image: require('@site/static/img/chara_icons/emu.png').default,
    description: (
      <>
        AI 拟人对话、群相册画廊、多引擎搜图、贴表情回应与随机小工具，让水群更加热闹有趣。
      </>
    ),
  },
  {
    title: '指令(并非)简单好查',
    image: require('@site/static/img/chara_icons/kanade.png').default,
    description: (
      <>
        支持群内 <code>/help</code> 交互式图文菜单与按需开关服务，文档站提供离线全文搜索（<code>Ctrl + K</code>），想用什么一搜就有。
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.iconContainer}>
        <img src={image} alt={title} className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className={styles.featureHeading}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
