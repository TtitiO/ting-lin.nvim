"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import AwardsList from "@/components/content/AwardsList";
import { awards } from "@/data/awards";
import { H1 } from "@/components/content/SectionHeading";

export default function AwardsPage() {
  const { t } = useLocale();

  return (
    <article className="space-y-8 max-w-2xl">
      <header>
        <H1>{t("awards.heading")}</H1>
      </header>

      <section>
        <AwardsList items={awards} />
      </section>
    </article>
  );
}
