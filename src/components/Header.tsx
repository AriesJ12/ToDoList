import type { HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLFormElement> {}

function Header(props: HeaderProps) {
  return (
    <header className="flex flex-col justify-center items-center gap-2 py-5">
      <h1 className="font-bold font-cursive text-3xl">Take Control of Your Day Today</h1>
      <form onSubmit={props.onSubmit}>
        <input name="details" placeholder="Details" className="border-primary border-solid border-3 rounded-sm p-2 focus:outline-fifth" />
        <button type="submit" className="ms-5 rounded-md p-2 hover:cursor-pointer bg-fourth hover:bg-fifth font-medium">Add To Do</button>
      </form>
    </header>
  );
}

export default Header;
