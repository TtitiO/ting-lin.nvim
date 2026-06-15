"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "en" | "zh";

interface LocaleContextValue {
  locale: Locale;
  toggle: () => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  toggle: () => {},
  t: (k) => k,
});

// Inline dictionaries — no external files needed at this scale
const dict: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "home",
    "nav.about": "about",
    "nav.research": "research",
    "nav.blog": "blog",
    // Dashboard
    "dash.title": "Ting Lin",
    "dash.subtitle": "Researcher · UM-SJTU Joint Institute",
    "dash.find": "Find file",
    "dash.about": "About me",
    "dash.research": "Research",
    "dash.contact": "Contact",
    // About
    "about.heading": "About Me",
    "about.bio": "I am a first-year Ph.D. student at Global College, Shanghai Jiao Tong University, working in Prof. Xinfei Guo's iCAS laboratory. My research focuses on architecture-oriented abstractions for AI inference, including accelerator compiler abstractions, memory-technology abstractions, and operator-level optimization and evaluation. I am particularly interested in how compilers and abstractions can expose hardware capabilities to AI inference workloads in a systematic and efficient way.",
    "about.interests": "Research Interests",
    "about.education": "Education",
    // Research
    "research.heading": "Publications",
    "research.pubs.heading": "Papers",
    "research.awards.heading": "Awards & Honors",
    // Blog
    "blog.heading": "Blog",
    // Contact
    "contact.heading": "Contact",
    "contact.email": "Email",
  },
  zh: {
    // Nav
    "nav.home": "主页",
    "nav.about": "关于",
    "nav.research": "研究",
    "nav.blog": "博客",
    // Dashboard
    "dash.title": "林汀",
    "dash.subtitle": "研究员 · 密西根上海交大联合学院",
    "dash.find": "搜索",
    "dash.about": "关于我",
    "dash.research": "研究工作",
    "dash.contact": "联系方式",
    // About
    "about.heading": "关于我",
    "about.bio": "我是上海交通大学致远学院的一年级博士研究生，在郭新飞教授的 iCAS 实验室从事科研工作。研究方向聚焦于面向 AI 推理的架构抽象，包括加速器编译器抽象、存储技术抽象以及算子级优化与评估。我尤其关注如何通过编译器与抽象层，系统高效地将硬件能力暴露给 AI 推理负载。",
    "about.interests": "研究方向",
    "about.education": "教育经历",
    // Research
    "research.heading": "论文发表",
    "research.pubs.heading": "论文",
    "research.awards.heading": "荣誉与获奖",
    // Blog
    "blog.heading": "博客",
    // Contact
    "contact.heading": "联系方式",
    "contact.email": "电子邮件",
  },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "zh") setLocale(saved);

    const listener = () => {
      setLocale((cur) => {
        const next: Locale = cur === "en" ? "zh" : "en";
        localStorage.setItem("locale", next);
        return next;
      });
    };
    document.addEventListener("toggle-locale", listener);
    return () => document.removeEventListener("toggle-locale", listener);
  }, []);

  const toggle = () => {
    const next: Locale = locale === "en" ? "zh" : "en";
    setLocale(next);
    localStorage.setItem("locale", next);
  };

  const t = useCallback(
    (key: string) => dict[locale][key] ?? dict["en"][key] ?? key,
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, toggle, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
