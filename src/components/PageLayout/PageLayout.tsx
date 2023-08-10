import { Outlet } from "react-router-dom";
import styled from "styled-components";

const PageLayout = () => {
  return (
    <FlexBox>
      <Nav />
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
