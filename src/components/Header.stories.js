import { fn } from "storybook/internal/test";

import IHeader from "./Header.vue";

export default {
  title: "Header/Header",
  component: IHeader,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    primary: true,
    label: "Header",
  },
};

export const Secondary = {
  args: {
    label: "Header",
    size: "small",
    backgroundColor: "yellow",
  },
};

export const Large = {
  args: {
    size: "large",
    label: "Header",
  },
};

export const Small = {
  args: {
    size: "small",
    label: "Header",
  },
};
