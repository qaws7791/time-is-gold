import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useMenuStore from "store/useMenuStore";
import Header from "./Header";

const { Content } = Layout;

const PageLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { changePage, changeMenu } = useMenuStore(state => state);
  const { pathname } = useLocation();

  useEffect(() => {
    changePage(pathname.split("/")[1]);
  }, [pathname, changePage, changeMenu]);

  return (
    //     <FlexBox>
    //       <Nav />
    //       <Main>
    //         <Outlet />
    //       </Main>
    //     </FlexBox>
    //   );
    // };

    // export default PageLayout;

    // const NAV_SIZE = "360px";

    // const FlexBox = styled.div`
    //   display: flex;
    // `;

    // const Nav = styled.nav`
    //   position: fixed;

    //   width: ${NAV_SIZE};
    //   height: 100%;
    //   border: 1px solid red;
    //   flex-shrink: 0;
    //   flex-grow: 0;
    // `;

    // const Main = styled.main`
    //   width: 100%;

    //   margin-left: ${NAV_SIZE};
    // `;
    <Layout style={{ height: "100vh" }}>
      <Header open={collapsed} setOpen={setCollapsed} />
      <Layout>
        <Sidebar open={collapsed} setOpen={setCollapsed} />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
