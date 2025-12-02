import type { HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLFormElement> {}

function Header(props: HeaderProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <input name="details" placeholder="Details" />
      <button type="submit">Add</button>
    </form>
  );
}

export default Header;
