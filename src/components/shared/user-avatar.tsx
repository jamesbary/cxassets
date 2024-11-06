import type { User } from "next-auth";
import React from "react";

import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

interface UserAvatarProps {
  user: Pick<User, "name" | "image" | "email">;
  initials?: boolean;
  inline?: boolean;
  avatarClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  iconClassName?: string;
}

const UserAvatar = ({
  user: { image, name, email },
  initials = false,
  inline = false,
  avatarClassName,
  fallbackClassName,
  iconClassName,
  imageClassName,
}: UserAvatarProps) => {
  return (
    <React.Fragment>
      <Avatar className={cn("size-8 rounded-lg", avatarClassName)}>
        <AvatarImage
          src={image || undefined}
          alt={name || undefined}
          className={cn(imageClassName)}
        />
        <AvatarFallback className={cn("rounded-lg", fallbackClassName)}>
          <span className="sr-only">{name}</span>
          {initials ? (
            getInitials(name).toUpperCase()
          ) : (
            <Icons.user className={cn("size-6", iconClassName)} />
          )}
        </AvatarFallback>
      </Avatar>
      {inline && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs">{email}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export { UserAvatar };
