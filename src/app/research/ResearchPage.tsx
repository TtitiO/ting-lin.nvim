"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import PublicationList from "@/components/content/PublicationList";
import AwardsList from "@/components/content/AwardsList";
import { publications } from "@/data/publications";
import { awards } from "@/data/awards";
import { H1, H2 } from "@/components/content/SectionHeading";

export default function ResearchPage() {
  const { t } = useLocale();

  return (
    <article className="space-y-12 max-w-2xl">
      <header>
        <H1>{t("research.heading")}</H1>
      </header>

      <section>
        <H2 className="mb-6">{t("research.pubs.heading")}</H2>
        <PublicationList items={publications} />
      </section>

      <section>
        <H2 className="mb-5">{t("research.awards.heading")}</H2>
        <AwardsList items={awards} />
      </section>
    </article>
  );
}
