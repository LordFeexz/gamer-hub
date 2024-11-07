import { useEffect, useState } from "react";

export default function useReadQueries() {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setParams({
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    });
  }, []);

  return params;
}
