import { useId } from "react";
import useOverlayStore from "store/useOverlayStore";
export type OverlayElement = ({ close }: { close: () => void }) => React.ReactNode;

const useOverlay = () => {
  const { addOverlay, deleteOverlay } = useOverlayStore(state => state);
  const overlayId = useId();

  return {
    open: (OverlayElement: OverlayElement) => {
      setTimeout(
        () => addOverlay(overlayId, OverlayElement({ close: () => deleteOverlay(overlayId) })),
        0
      );
    },
    close: () => {
      deleteOverlay(overlayId);
    }
  };
};

export default useOverlay;
