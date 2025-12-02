import type { Meta, StoryObj } from '@storybook/react';
import ItemsCategories from "../components/ItemsCategories";
import Items from '../components/Items';

const Droppable = {
  component: ItemsCategories,
} satisfies Meta<typeof ItemsCategories>;


export default Droppable;

type Story = StoryObj<typeof Droppable>;

 
export const Primary: Story = {
  args: {
    children: <>
    <Items id="123" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    <Items id="124" value='123'>
    </Items>
    </> ,
    id: "To Do",
  },
}
