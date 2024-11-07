import { isInIndonesia } from "@/helpers/global";
import { useEffect, useState } from "react";

export default function useInIndonesia() {
  const [isIn, setIsIn] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setIsIn(isInIndonesia(latitude, longitude));
      });
  }, []);

  return isIn;
}
