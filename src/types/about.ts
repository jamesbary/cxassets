export type Story = {
  title: string;
  description: string;
};
export type Values = Story & {
  items: Story[];
};
export type Team = Story & {
  items: Story[];
};
export type Why = Story & {
  items: Story[];
};

export type AboutData = {
  story: Story;
  values: Values;
  team: Team;
  whyus: Why;
};
