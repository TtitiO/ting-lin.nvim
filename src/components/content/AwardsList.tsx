import { type Award } from "@/data/awards";

export default function AwardsList({ items }: { items: Award[] }) {
  return (
    <div className="space-y-2">
      {items.map((award) => (
        <div key={award.id} className="flex items-start gap-3 text-sm">
          {/* git log style left decoration */}
          <div className="flex flex-col items-center pt-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-ctp-yellow shrink-0" />
          </div>
          <div>
            <span className="text-ctp-yellow font-semibold">
              {award.title}
            </span>
            <span className="text-ctp-overlay1 text-xs ml-2">{award.org} · {award.year}</span>
            {award.paper && (
              <div className="text-xs text-ctp-subtext0 mt-0.5 italic">
                for: {award.paper}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
