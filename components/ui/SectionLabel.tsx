export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#944a00]">
      <span aria-hidden="true" className="w-6 h-px bg-[#944a00] inline-block" />
      {children}
    </span>
  );
}
