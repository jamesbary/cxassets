"use client";

import { updateIpCountry } from "@/lib/actions/user";
import { useEffect } from "react";

type Props = React.HTMLAttributes<HTMLElement> & { id?: string };
const Location = ({ id, className, ...props }: Props) => {
  useEffect(() => {
    const fetchAndUpdateLocation = async () => {
      const res = await fetch("https://api.ipify.org", { cache: "no-store" });
      const ip = await res.text();

      // console.log({ ip });

      if (id && ip) {
        try {
          const res = await fetch(
            `https://get.geojs.io/v1/ip/country/${ip}.json`,
            {
              cache: "no-store",
            }
          );
          const data = await res.json();
          // console.log({ data });
          await updateIpCountry(id, data.name);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAndUpdateLocation();
  }, [id]);

  return null;
};

export { Location };
