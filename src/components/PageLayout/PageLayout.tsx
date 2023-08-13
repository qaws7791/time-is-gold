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
