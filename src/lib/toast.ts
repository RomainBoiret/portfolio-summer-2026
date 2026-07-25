export const TOAST_EVENT = "portfolio-toast";

export type ToastTone = "default" | "success" | "egg";

export type ToastDetail = {
  title: string;
  description: string;
  spark?: boolean;
  tone?: ToastTone;
};

export function announceToast(detail: ToastDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail }));
}
