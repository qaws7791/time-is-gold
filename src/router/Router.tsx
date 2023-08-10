import MainLayout from "components/MainLayout";
import PageLayout from "components/PageLayout";
import { Calendar, Home, Login, OverlayTest, Todo } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="overlay-test" element={<OverlayTest />} />
        </Route>
        <Route element={<PageLayout />}>
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
