export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "conference" | "journal" | "preprint";
  url?: string;
  award?: string;
  highlight?: boolean;
}

export const publications: Publication[] = [
  {
    id: "shift-left-2026",
    title: "Shift-Left Techniques in Electronic Design Automation: A Survey",
    authors: ["Xinyue Wu", "Zixuan Li", "Fan Hu", "Ting Lin", "Runxi Wang", "Xiaotian Zhao", "Xinfei Guo"],
    venue: "ACM Computing Surveys, 2026",
    year: 2026,
    type: "journal",
    url: "https://doi.org/10.1145/3819588",
  },
  {
    id: "cool3d-2025",
    title: "Cool-3D: An End-to-End Thermal-Aware Framework for Early-Phase Design Space Exploration of Microfluidic-Cooled 3DICs",
    authors: ["Runxi Wang", "Ziheng Wang", "Ting Lin", "Jacob M. Raby", "Mircea R. Stan", "Xinfei Guo"],
    venue: "IEEE Journal on Emerging and Selected Topics in Circuits and Systems (JETCAS), Vol. 15, No. 4, December 2025",
    year: 2025,
    type: "journal",
    url: "https://ieeexplore.ieee.org/document/11083607",
    award: "2026 IEEE Outstanding Young Author Award",
    highlight: true,
  },
];
