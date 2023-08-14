import { Calendar, Home, Login, OverlayTest, Todo } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Calendar />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="overlay-test" element={<OverlayTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
