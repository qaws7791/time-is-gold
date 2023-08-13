import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "supabase/index";
const Home = () => {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
          user !== null ? navigate("/calendar") : navigate("/login");
        }
      });
    }
    getUserData();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <br />
      <Link to={"/todo"}>투두</Link>
      <br />
      <br />
      <Link to={"/calendar"}>일정</Link>
      <br />
      <div></div>
    </div>
  );
};

export default Home;
