import { useRouter } from "next/navigation";
import { useEffect, type MutableRefObject } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useWriteQueries(
  delay: number,
  ...refs: MutableRefObject<HTMLInputElement | null>[]
) {
  const router = useRouter();

  const handleUpdateQuery = useDebouncedCallback((e) => {
    e?.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);

    refs.forEach((ref) => {
      if (!ref.current) return;
      currentParams.set(ref.current.name, ref.current.value);
    });

    router.replace(`${window.location.pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  }, delay);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref.current) return;
      ref.current.addEventListener("blur", handleUpdateQuery);
    });

    return () => {
      refs.forEach((ref) => {
        if (!ref.current) return;

        ref.current.removeEventListener("blur", handleUpdateQuery);
      });
    };
  }, [refs, router]);
}
