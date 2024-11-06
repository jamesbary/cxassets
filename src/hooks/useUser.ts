import type { AuthUser } from "@/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Partial<AuthUser>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/user/${session.user.id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.id) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [session?.user?.id]);

  return {
    user: {
      ...session?.user,
      ...userData,
    },
    loading: status === "loading" || loading,
  };
}
