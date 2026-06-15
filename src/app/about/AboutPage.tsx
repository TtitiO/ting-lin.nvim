"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE } from "@/lib/constants";
import { H1, H2 } from "@/components/content/SectionHeading";

const researchInterests = {
  en: [
    "Accelerator compiler abstractions for AI inference",
    "Memory-technology abstractions (LPDDR)",
    "Operator-level optimization and evaluation for DNN workloads",
    "Co-design of hardware and compiler for AI accelerators",
  ],
  zh: [
    "面向 AI 推理的加速器编译器抽象",
    "存储技术抽象（LPDDR）",
    "深度神经网络工作负载的算子级优化与评估",
    "AI 加速器的硬件与编译器协同设计",
  ],
};

const education = {
  en: [
    { degree: "Ph.D. Student, Electrical and Computer Engineering", school: "Global College, Shanghai Jiao Tong University", year: "2025 – present" },
    { degree: "B.Eng., Electrical and Computer Engineering", school: "Global College, Shanghai Jiao Tong University", year: "2021 – 2025" },
  ],
  zh: [
    { degree: "电气与计算机工程 博士研究生", school: "上海交通大学致远学院", year: "2025 – 至今" },
    { degree: "电气与计算机工程 工学学士", school: "上海交通大学致远学院", year: "2021 – 2025" },
  ],
};

export default function AboutPage() {
  const { locale, t } = useLocale();
  const interests = researchInterests[locale];
  const edu = education[locale];

  return (
    <article className="space-y-8 max-w-2xl">
      <header>
        <H1>{t("about.heading")}</H1>
      </header>

      <section>
        <p className="text-base text-ctp-text leading-7">
          {t("about.bio")}
        </p>
      </section>

      {/* Research interests */}
      <section>
        <H2 className="mb-4">{t("about.interests")}</H2>
        <ul className="space-y-2">
          {interests.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ctp-text leading-6">
              <span className="w-1.5 h-1.5 rounded-full bg-ctp-teal shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section>
        <H2 className="mb-4">{t("about.education")}</H2>
        <div className="space-y-4">
          {edu.map((e, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <span className="font-mono text-xs text-ctp-overlay0 shrink-0 pt-0.5 w-28">{e.year}</span>
              <div className="border-l-2 border-ctp-blue/30 pl-4">
                <div className="text-sm font-semibold text-ctp-text leading-5">{e.degree}</div>
                <div className="text-sm text-ctp-subtext1 mt-0.5">{e.school}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
