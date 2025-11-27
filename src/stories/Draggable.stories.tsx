import type { Meta, StoryObj } from '@storybook/react';
import Items from "../components/Items";

const Draggable = {
  component: Items,
} satisfies Meta<typeof Items>;


export default Draggable;

type Story = StoryObj<typeof Draggable>;
 
export const Primary: Story = {
  args: {
    children: <>123</>,
    id: '1',
  },
}
