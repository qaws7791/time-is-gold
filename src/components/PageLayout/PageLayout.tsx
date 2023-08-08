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

const FlexBox = styled.div`
  display: flex;
`;

const Nav = styled.nav`
  width: 360px;
  height: 100vh;
  border: 1px solid red;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Main = styled.main`
  width: 100%;
`;
