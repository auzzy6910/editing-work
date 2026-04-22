import { FilterConsole } from "@/components/panel/FilterConsole";

export const metadata = {
  title: "Work — Robert Editing",
  description: "Every document Robert has edited. Filter by country, type, language, industry.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">The archive</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Every edit, on record.</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Twelve recent transformations. Filter the console on the left — the URL updates so you
          can share any view.
        </p>
      </header>
      <FilterConsole />
    </div>
  );
}
