import { Fragment } from "react";
import { createPortal } from "react-dom";
import useOverlayStore from "store/useOverlayStore";

const OverlayRoot = () => {
  const { overlays } = useOverlayStore(state => state);

  return createPortal(
    <>
      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>,
    document.getElementById("dialog-root") as HTMLElement
  );
};

export default OverlayRoot;
