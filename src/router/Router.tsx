import MainLayout from "components/MainLayout";
import PageLayout from "components/PageLayout";
import { Calendar, Home, Login, OverlayTest, Todo } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  const userCheck = <></>;
  return (
    <BrowserRouter>
      <Routes>
        {/* Home의 역활 = user check // PageLayout이랑 합쳐도 됨 */}
        <Route path="/" element={<Home />}>
          {/* Home의 역활 => 기능 : 유저정보 체크 */}
          {/* home 로그인 상태 체크 */}
          {/* 로그인 true Home의 chidren으로 접근 가능 */}
          {/* 로그인 false navigate /login */}
          {/* <Route element={<MainLayout />}></Route> MainLayout 현재 안쓰임 삭제 예정 */}
          <Route element={<PageLayout />}>
            {/* PageLayout의 역활 => 스타일 : 헤더와 사이드바를 자식을에게 공통으로 넘겨줌 */}
            <Route index element={<Calendar />} />
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Route>
        <Route path="overlay-test" element={<OverlayTest />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
