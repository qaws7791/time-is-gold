import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "supabase/index";
import Login from "pages/Login/Login";
import Calendar from "pages/Calendar/Calendar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
          if (!user) navigate("/login");
          // user !== null ? navigate("/calendar") : navigate("/login");
        }
      });
    }
    getUserData();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Home;
