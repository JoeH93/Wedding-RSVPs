export default function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-10 select-none" aria-hidden="true">
      <span className="h-px w-16 bg-[#B08D57]/50" />
      <span className="font-serif text-2xl text-[#B08D57] italic">&amp;</span>
      <span className="h-px w-16 bg-[#B08D57]/50" />
    </div>
  );
}