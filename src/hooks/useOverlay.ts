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

// example

// const openPromiseAlert = () => new Promise((resolve) => {
//   firstOverlay.open(({close})=>(
//     <AlertModal
//       onClose={() => {
//         resolve(true)
//         close()
//       }}
//     />
//   ))
// })

// const openPromiseConfirm = () => new Promise((resolve) => {
//   firstOverlay.open(({close})=>(
//     <ConfirmModal
//       onConfirm={() => {
//         resolve(true)
//         close()
//       }}

//       onClose={() => {
//         resolve(false)
//         close()
//       }}
//     />
//   ))
// })
