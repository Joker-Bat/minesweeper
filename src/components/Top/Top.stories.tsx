import React from "react";
import { Story, Meta } from "@storybook/react";

import { Top, TopComponentProps } from "./Top";

export default {
  title: "Top/Top",
  component: Top,
} as Meta;

const Template: Story<TopComponentProps> = (args) => <Top {...args} />;

export const TopPanel = Template.bind({});

TopPanel.args = {
  children: "Minesweeper",
  feature: "flat",
  firstAction: "ctrl",
  secondAction: "click",
};
