import { fn } from "storybook/internal/test";

import IFooter from "./Footer.vue";

export default {
  title: "Footer/Footer",
  component: IFooter,
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
    label: "Footer",
  },
};

export const Secondary = {
  args: {
    label: "Footer",
    size: "small",
    backgroundColor: "yellow",
  },
};

export const Large = {
  args: {
    size: "large",
    label: "Footer",
  },
};

export const Small = {
  args: {
    size: "small",
    label: "Footer",
  },
};
