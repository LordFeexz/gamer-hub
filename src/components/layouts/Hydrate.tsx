"use client";

import Aos from "aos";
import { memo, useEffect } from "react";

function Hydrate() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      delay: 50,
    });
  }, []);

  return null;
}

export default memo(Hydrate);
