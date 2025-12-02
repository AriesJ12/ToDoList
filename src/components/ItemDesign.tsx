import type { HTMLAttributes, ReactNode, Ref } from "react";

interface ItemDesignProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

function ItemDesign({ ref, children, ...props }: ItemDesignProps) {
  return (
    <div ref={ref} {...props} className="basis-full bg-third w-full rounded-md shadow-md p-5">
      {children}
    </div>
  );
}

export default ItemDesign
