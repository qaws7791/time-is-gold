import { Modal } from "components/common";
import { Outlet } from "react-router-dom";
import useModalStore from "store/useModalStore";
import styled from "styled-components";

const PageLayout = () => {
  const { myProfile, openModal } = useModalStore(state => state);

  const modalOpen = () => openModal("myProfile");

  return (
    <FlexBox>
      <Nav>
        <button onClick={modalOpen}>모달열기</button>
        {myProfile && (
          <Modal closeTarget="myProfile">
            <p>test</p>
          </Modal>
        )}
      </Nav>
      <Main>
        <Outlet />
      </Main>
    </FlexBox>
  );
};

export default PageLayout;

const NAV_SIZE = "360px";

const FlexBox = styled.div`
  display: flex;
`;

const Nav = styled.nav`
  position: fixed;

  width: ${NAV_SIZE};
  height: 100%;
  border: 1px solid red;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Main = styled.main`
  width: 100%;

  margin-left: ${NAV_SIZE};
`;
