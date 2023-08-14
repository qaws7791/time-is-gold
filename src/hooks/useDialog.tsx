import AlertModal from "components/common/BaseModal/AlertModal/AlertModal";
import ConfirmModal from "components/common/BaseModal/ConfirmModal/ConfirmModal";
import PromptModal from "components/common/BaseModal/PromptModal/PromptModal";
import useOverlay from "./useOverlay";

type TDialogType = "alert" | "confirm" | "prompt";

interface TOpenDialogProps {
  type: TDialogType;
  title?: string | undefined;
  content?: React.ReactNode;
}

export const useDialog = () => {
  const overlay = useOverlay();

  const openDialog = ({ type, title, content }: TOpenDialogProps) => {
    const modalProps = { title, content };

    return new Promise(resolve => {
      overlay.open(({ close }) => {
        switch (type) {
          case "alert":
            return (
              <AlertModal
                {...modalProps}
                onClose={() => {
                  resolve(true);
                  close();
                }}
              />
            );

          case "confirm":
            return (
              <ConfirmModal
                {...modalProps}
                onConfirm={() => {
                  resolve(true);
                  close();
                }}
                onClose={() => {
                  resolve(false);
                  close();
                }}
              />
            );
          case "prompt":
            return (
              <PromptModal
                {...modalProps}
                onConfirm={inputText => {
                  resolve(inputText);
                  close();
                }}
                onClose={() => {
                  resolve(null);
                  close();
                }}
              />
            );
        }
      });
    });
  };

  return { openDialog };
};
