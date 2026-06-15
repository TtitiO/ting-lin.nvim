"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { blogPosts } from "@/data/blog";
import { H1 } from "@/components/content/SectionHeading";

export default function BlogPage() {
  const { locale, t } = useLocale();

  return (
    <article className="space-y-8 max-w-2xl">
      <header>
        <H1>{t("blog.heading")}</H1>
      </header>

      {blogPosts.length === 0 ? (
        <div className="border border-ctp-surface1 rounded-sm p-6 text-center">
          <p className="text-ctp-subtext0 text-sm">
            {locale === "zh"
              ? "博客即将上线，敬请期待。"
              : "Posts coming soon. Check back later."}
          </p>
          <p className="text-xs text-ctp-overlay0 font-mono mt-2">-- no entries yet</p>
        </div>
      ) : (
        <section className="space-y-6">
          {blogPosts
            .filter((p) => !p.draft)
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((post) => (
              <div
                key={post.id}
                className="border-l-2 border-ctp-pink/40 hover:border-ctp-pink pl-4 transition-colors cursor-pointer group"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-xs text-ctp-overlay0 shrink-0">{post.date}</span>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-ctp-surface0 text-ctp-overlay1 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-base font-semibold text-ctp-text group-hover:text-ctp-pink transition-colors">
                  {locale === "zh" ? post.titleZh : post.titleEn}
                </h2>
                <p className="text-sm text-ctp-subtext1 mt-1 leading-5">
                  {locale === "zh" ? post.excerptZh : post.excerptEn}
                </p>
              </div>
            ))}
        </section>
      )}
    </article>
  );
}
