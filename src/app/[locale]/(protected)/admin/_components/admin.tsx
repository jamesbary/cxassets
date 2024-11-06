"use client";

import { BlockUser } from "@/app/[locale]/(protected)/admin/_components/block-alert";
import { Cards } from "@/app/[locale]/(protected)/admin/_components/cards";
import { DeleteUser } from "@/app/[locale]/(protected)/admin/_components/delete-alert";
import { SelectUser } from "@/app/[locale]/(protected)/admin/_components/select-user";
import { UnblockUser } from "@/app/[locale]/(protected)/admin/_components/unblock-alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { categorizeUsersIntoGroups, cn, userMetrics } from "@/lib/utils";
import { AdminUser, Group } from "@/types";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & { users: AdminUser[] };
const Admin = ({ users, className, ...props }: Props) => {
  const [selectedUser, setSelectedUser] = React.useState<Group>({
    label: users[0].name,
    src: users[0].image ?? "",
    value: users[0].id,
  });

  const groups = categorizeUsersIntoGroups(users);
  const user = userMetrics(selectedUser.value, users);

  return (
    <section className={cn("space-y-4", className)} {...props}>
      <div className="flex flex-col gap-1.5 xs:flex-row xs:justify-between">
        <SelectUser
          groups={groups}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          className="mr-auto"
        />
        {user && user.status === "active" ? (
          <BlockUser name={user.name} id={user.id} />
        ) : user && user.status === "closed" ? (
          <UnblockUser name={user.name} id={user.id} />
        ) : null}
        {user ? <DeleteUser name={user.name} id={user.id} /> : null}
      </div>
      {user ? <Cards user={user} /> : <Skeleton />}
      {user ? (
        <Card>
          <CardHeader className="flex-row justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              {user.username}
            </CardTitle>
            <Badge>{user.ipCountry ?? "Not updated yet"}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-bold">Full Name:</span>{" "}
              <span>{user.name}</span>
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              <span>{user.email}</span>
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton />
      )}
    </section>
  );
};

export { Admin };
