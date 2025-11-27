import type { Meta, StoryObj } from '@storybook/react';
import ItemsCategories from "../components/ItemsCategories";

const Droppable = {
  component: ItemsCategories,
} satisfies Meta<typeof ItemsCategories>;


export default Droppable;

type Story = StoryObj<typeof Droppable>;

 
export const Primary: Story = {
  args: {
    children: <>123</>,
    id: "To Do",
  },
}
