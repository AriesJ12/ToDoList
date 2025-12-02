interface HeaderPopUpProps{
    openMainWindow: () => void;
    changeCategory: (type: "left" | "right") => void;
}

function HeaderPopUp(props: HeaderPopUpProps) {
  return (
    <>
      <button type="button" onClick={props.openMainWindow} className="">
        open window
      </button>
      <button
        type="button"
        onClick={() => props.changeCategory("left")}
        className="border"
      >
        go left
      </button>
      <button
        type="button"
        onClick={() => props.changeCategory("right")}
        className="border"
      >
        go right
      </button>
    </>
  );
}

export default HeaderPopUp;
