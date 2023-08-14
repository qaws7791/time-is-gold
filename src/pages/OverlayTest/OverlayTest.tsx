import AlertModal from "components/common/BaseModal/AlertModal";
import ConfirmModal from "components/common/BaseModal/ConfirmModal";
import PromptModal from "components/common/BaseModal/PromptModal";
import useOverlay from "hooks/useOverlay";

const OverlayTest = () => {
  const overlay = useOverlay();

  const openPromiseAlert = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <AlertModal
          onClose={() => {
            resolve(true);
            close();
          }}
        />
      ));
    });

  const openPromiseConfirm = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <ConfirmModal
          onConfirm={() => {
            resolve(true);
            close();
          }}
          onClose={() => {
            resolve(false);
            close();
          }}
        />
      ));
    });

  const openPromisePrompt = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <PromptModal
          onConfirm={inputText => {
            resolve(inputText);
            close();
          }}
          onClose={() => {
            resolve(null);
            close();
          }}
        />
      ));
    });

  const handleOpenAlert = async () => {
    await openPromiseAlert();
    console.log("Alert 모달에서 확인을 눌렀습니다.");
  };

  const handleOpenConfirm = async () => {
    const confirm = await openPromiseConfirm();
    console.log("Confirm 모달에서 " + (confirm ? "확인을 눌렀습니다." : "취소를 눌렀습니다."));
  };

  const handleOpenPrompt = async () => {
    const value = await openPromisePrompt();
    if (value) console.log("Prompt 모달에서 ", value, "을 눌렀습니다");
  };

  return (
    <div>
      <h1>OverlayTest</h1>
      <button onClick={handleOpenAlert}>Alert 모달 열기</button>
      <button onClick={handleOpenConfirm}>Confirm 모달열기</button>
      <button onClick={handleOpenPrompt}>Prompt 모달열기</button>
    </div>
  );
};

export default OverlayTest;
