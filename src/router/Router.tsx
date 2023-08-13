import { Calendar, Home, Login, OverlayTest, Todo } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="/" element={<MainLayout />}> */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route element={<PageLayout />}> */}
          <Route path="/todo" element={<Todo />} />
          <Route index element={<Calendar />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* </Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="overlay-test" element={<OverlayTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
