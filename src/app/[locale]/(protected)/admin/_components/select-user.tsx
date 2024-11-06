"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Group } from "@/types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  groups: {
    label: string;
    teams: Group[];
  }[];
  selectedUser: Group;
  setSelectedUser: React.Dispatch<React.SetStateAction<Group>>;
}
const SelectUser = ({
  selectedUser,
  setSelectedUser,
  groups,
  className,
}: TeamSwitcherProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a user"
          className={cn(
            "w-full xs:w-[220px] justify-between px-1.5",
            className
          )}
        >
          <UserAvatar
            user={{ name: selectedUser.label, image: selectedUser.src }}
          />
          {selectedUser.label}
          <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandList className="max-h-[35vh] max-h-[35dvh]">
            <ScrollArea className="h-[calc(35vh)] h-[calc(35dvh)]">
              <CommandInput placeholder="Search users..." />
              <CommandEmpty>No user found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label ?? ""}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedUser(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <UserAvatar
                        user={{ name: team.label, image: team.src }}
                        avatarClassName="mr-2 size-5"
                        iconClassName="size-3"
                      />
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedUser.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { SelectUser };
