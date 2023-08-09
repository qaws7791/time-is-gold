import { Link } from "react-router-dom";

const Home = () => {
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
