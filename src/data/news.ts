export interface NewsItem {
  id: string;
  date: string;
  titleEn: string;
  titleZh: string;
  bodyEn?: string;
  bodyZh?: string;
  url?: string;
  highlight?: boolean;
}

export const news: NewsItem[] = [
  {
    id: "ieee-award-2026",
    date: "2026-05",
    titleEn: "Honored with 2026 IEEE Outstanding Young Author Award",
    titleZh: "荣获 2026 年 IEEE 杰出青年作者奖",
    bodyEn: 'Received the 2026 IEEE Outstanding Young Author Award for the paper "Cool-3D: An End-to-End Thermal-Aware Framework for Early-Phase Design Space Exploration of Microfluidic-Cooled 3DICs".',
    bodyZh: '因论文《Cool-3D：面向微流体冷却三维集成电路早期设计空间探索的端到端热感知框架》荣获 2026 年 IEEE 杰出青年作者奖。',
    highlight: true,
  },
];
