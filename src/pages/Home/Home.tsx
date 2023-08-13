import { Layout } from "antd";
import { Header, Sidebar } from "components/PageLayout";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "store";
import useMenuStore from "store/useMenuStore";
import supabase from "supabase";

const { Content } = Layout;

const Home = () => {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const watchAuthState = async () => {
      await supabase.auth.onAuthStateChange((event, session) => {
        if (session === null) {
          navigate("/login");
        }
        if (event === "SIGNED_IN" && session && session.user.email) {
          setCurrentUser(session.user.email);
          navigate("/");
        } else if (event === "SIGNED_OUT") {
          setCurrentUser("");
          navigate("/login");
        }
      });
    };
    watchAuthState();
  }, [navigate, setCurrentUser]);

  const [collapsed, setCollapsed] = useState(true);
  const { changePage, changeMenu } = useMenuStore(state => state);
  const { pathname } = useLocation();

  useEffect(() => {
    changePage(pathname.split("/")[1]);
  }, [pathname, changePage, changeMenu]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
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

export default Home;
