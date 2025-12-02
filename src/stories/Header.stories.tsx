import type { Meta, StoryObj } from '@storybook/react';
import Header from "../components/Header";

const HeaderMain = {
  component: Header,
} satisfies Meta<typeof Header>;


export default HeaderMain;

type Story = StoryObj<typeof HeaderMain>;
 
export const Primary: Story = {
  args: {
  },
}
