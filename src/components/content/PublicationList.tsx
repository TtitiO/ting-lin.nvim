import { type Publication } from "@/data/publications";

export default function PublicationList({ items }: { items: Publication[] }) {
  return (
    <div className="space-y-4">
      {items.map((pub) => (
        <div
          key={pub.id}
          className="border-l-2 border-ctp-surface1 pl-4 py-1 hover:border-ctp-blue transition-colors group"
        >
          {pub.award && (
            <div className="text-xs text-ctp-yellow mb-1 flex items-center gap-1">
              <span aria-hidden="true">★</span>
              <span>{pub.award}</span>
            </div>
          )}
          <div className="text-sm text-ctp-text leading-relaxed">
            {pub.url ? (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ctp-blue hover:underline"
              >
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </div>
          <div className="text-xs text-ctp-subtext0 mt-1">
            {pub.authors.map((a, i) => (
              <span key={i}>
                {a === "Ting Lin" ? (
                  <strong className="text-ctp-lavender">{a}</strong>
                ) : (
                  a
                )}
                {i < pub.authors.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className="text-xs text-ctp-overlay1 mt-0.5 italic">
            {pub.venue} · {pub.year}
          </div>
        </div>
      ))}
    </div>
  );
}
