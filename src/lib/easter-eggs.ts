import type { Locale } from "@/i18n/config";
import { announceToast } from "@/lib/toast";

export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export type EggCopy = {
  consoleTitle: string;
  consoleBody: string;
  toastKonamiTitle: string;
  toastKonamiBody: string;
  toastHireTitle: string;
  toastHireBody: string;
  toastCoffeeTitle: string;
  toastCoffeeBody: string;
  toastSourceTitle: string;
  toastSourceBody: string;
  toastFooterTitle: string;
  toastFooterBody: string;
  cmdHire: string;
  cmdHireHint: string;
  cmdCoffee: string;
  cmdCoffeeHint: string;
  cmdSource: string;
  cmdSourceHint: string;
  cmdGroup: string;
};

const eggsEn: EggCopy = {
  consoleTitle: "Under the hood?",
  consoleBody:
    "Cmd+K / Ctrl+K → hire, coffee, or source. The Konami code works too.",
  toastKonamiTitle: "Soft skills unlocked",
  toastKonamiBody: "You found the Konami code. Nice catch.",
  toastHireTitle: "Let's talk",
  toastHireBody: "Direct approach - the contact form is open.",
  toastCoffeeTitle: "Coffee break",
  toastCoffeeBody: "Black, no sugar. The contact form works too.",
  toastSourceTitle: "Source opened",
  toastSourceBody: "The GitHub profile is ready when you are.",
  toastFooterTitle: "Persistence noted",
  toastFooterBody: "Five clicks on the footer. Well played.",
  cmdHire: "Hire Romain",
  cmdHireHint: "Open the contact form",
  cmdCoffee: "Coffee break",
  cmdCoffeeHint: "A quiet tip",
  cmdSource: "View source",
  cmdSourceHint: "GitHub repository",
  cmdGroup: "Secrets",
};

const eggsFr: EggCopy = {
  consoleTitle: "Sous le capot ?",
  consoleBody:
    "Cmd+K / Ctrl+K → hire, coffee, ou source. Le code Konami marche aussi.",
  toastKonamiTitle: "Soft skills débloqués",
  toastKonamiBody: "Vous avez trouvé le code Konami. Bien vu.",
  toastHireTitle: "Discutons",
  toastHireBody: "Approche directe - le formulaire de contact est ouvert.",
  toastCoffeeTitle: "Pause café",
  toastCoffeeBody: "Noir, sans sucre. Le formulaire de contact marche aussi.",
  toastSourceTitle: "Code source",
  toastSourceBody: "Le profil GitHub est prêt quand vous l’êtes.",
  toastFooterTitle: "Persévérance notée",
  toastFooterBody: "Cinq clics sur le pied de page. Bien joué.",
  cmdHire: "Embaucher Romain",
  cmdHireHint: "Ouvrir le formulaire de contact",
  cmdCoffee: "Pause café",
  cmdCoffeeHint: "Un petit clin d’œil",
  cmdSource: "Voir le code source",
  cmdSourceHint: "Dépôt GitHub",
  cmdGroup: "Secrets",
};

export function getEggCopy(locale: Locale): EggCopy {
  return locale === "fr" ? eggsFr : eggsEn;
}

export function announceEgg(detail: {
  title: string;
  description: string;
  spark?: boolean;
}) {
  announceToast({ ...detail, tone: "egg" });
}

export function sparkPage() {
  if (typeof window === "undefined") return;

  document.querySelectorAll(".egg-spark-overlay").forEach((node) => node.remove());

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const overlay = document.createElement("div");
  overlay.className = reduced
    ? "egg-spark-overlay is-reduced"
    : "egg-spark-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  window.setTimeout(
    () => {
      overlay.remove();
    },
    reduced ? 450 : 900,
  );
}
