"use client";

import { updateIpCountry } from "@/lib/actions/user";
import { useEffect } from "react";

type Props = React.HTMLAttributes<HTMLElement> & { id?: string };
const UserLocation = ({ id, className, ...props }: Props) => {
  useEffect(() => {
    const fetchAndUpdateLocation = async () => {
      const ipRes = await fetch("/api/ip");
      const { ip } = await ipRes.json();

      // console.log(ip);

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

export { UserLocation };
