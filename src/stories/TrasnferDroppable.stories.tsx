import type { Meta, StoryObj } from '@storybook/react';
import TransferCategory from "../components/TransferCategory";

const TransferDroppable = {
  component: TransferCategory,
} satisfies Meta<typeof TransferCategory>;


export default TransferDroppable;

type Story = StoryObj<typeof TransferDroppable>;

 
export const Primary: Story = {
  args: {
    children: <>1</>,
    id: "trash1",
    mode: "left",
    type: "danger"
  },
}
