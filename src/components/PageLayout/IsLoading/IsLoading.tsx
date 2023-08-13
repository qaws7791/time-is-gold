import { LoadingOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

export const IsLoading = () => {
  return createPortal(
    <Outer>
      <LoadingOutlined style={{ fontSize: "150px", color: "#fff" }} spin />
    </Outer>,
    document.getElementById("loading-root") as HTMLElement
  );
};

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.1);
`;
