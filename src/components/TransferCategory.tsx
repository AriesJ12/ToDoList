import { useDroppable } from "@dnd-kit/core";

interface TransferCategoryProps {
  id: string;
}

function TransferCategory(props: TransferCategoryProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };
  return <div ref={setNodeRef} style={style}>TransferCategory</div>;
}

export default TransferCategory;
