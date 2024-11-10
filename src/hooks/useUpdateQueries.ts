import type { ChangeEvent, ChangeEventHandler } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useUpdateQueries(delay = 300) {
  const handler: ChangeEventHandler<HTMLInputElement> = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e?.preventDefault();
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set(e.target.name, e.target.value);

      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${currentParams.toString()}`
      );
    },
    delay
  );

  return handler;
}
