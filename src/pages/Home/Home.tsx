import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "store";
import supabase from "supabase";

const Home = () => {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const getUserData = async () => {
      await supabase.auth.getUser().then(value => {
        if (value.data.user && value.data.user.email) {
          setCurrentUser(value.data.user.email);
          console.log("value.data.user :", value.data.user.email);
        }
      });
    };
    getUserData();
  }, [setCurrentUser]);

  return (
    <div>
      <h1>Home</h1>
      <br />
      <Link to={"/todo"}>투두</Link>
      <br />
      <br />
      <Link to={"/calendar"}>일정</Link>
      <br />
    </div>
  );
};

export default Home;
