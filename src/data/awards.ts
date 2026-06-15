export interface Award {
  id: string;
  title: string;
  titleCn: string;
  org: string;
  year: number;
  paper?: string;
  highlight?: boolean;
}

export const awards: Award[] = [
  {
    id: "ieee-oyal-2026",
    title: "IEEE Outstanding Young Author Award",
    titleCn: "IEEE 杰出青年作者奖",
    org: "IEEE",
    year: 2026,
    paper: "Cool-3D: An End-to-End Thermal-Aware Framework for Early-Phase Design Space Exploration of Microfluidic-Cooled 3DICs",
    highlight: true,
  },
];
