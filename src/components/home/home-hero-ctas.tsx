import { Button } from "@/components/ui/button";

export function HomeHeroCtas({
  locale,
  seeProjects,
  seeNotes,
}: {
  locale: string;
  seeProjects: string;
  seeNotes: string;
}) {
  return (
    <div className="hero-fade hero-fade-delay mt-7 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
      <Button href="#projects" arrow>
        {seeProjects}
      </Button>
      <Button href={`/${locale}/blog`} variant="secondary">
        {seeNotes}
      </Button>
    </div>
  );
}
