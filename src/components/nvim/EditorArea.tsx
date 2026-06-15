export default function EditorArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-ctp-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {children}
      </div>
    </div>
  );
}
