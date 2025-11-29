import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

export function useLinkInterceptor() {
  const router = useRouter();

  const handler = (e: MouseEvent) => {
    const path = e.composedPath() as HTMLElement[];

    const link = path.find((el) => el instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    if (
      link.target === "_blank" ||
      link.hasAttribute("download")
    ) {
      return;
    }

    if (url.hash && url.pathname === window.location.pathname) return;

    e.preventDefault();
    void router.push(url.pathname + url.search + url.hash);
  };

  onMounted(() => {
    window.addEventListener("click", handler, { capture: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", handler, { capture: true });
  });
}
