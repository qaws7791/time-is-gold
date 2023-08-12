import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 46% 54%;
  align-items: center;
  justify-items: center;
`;
export const MainImg = styled.img`
  max-width: 100%;
  height: 100vh;
`;
export const GoogleLoginImgFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const GoogleSignImgFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const GoogleImg = styled.img`
  position: absolute;
  left: -1%;
  top: -3%;
`;
export const LogInTabs = styled.div`
  display: grid;
  grid-column: 2/3;
  width: 368px;
  height: 467px;
  text-align: center;
  align-items: center;
  .ant-form-item {
    margin-bottom: 24px;
  }
  .ant-tabs-nav-wrap {
    background-color: #f3c300;
    justify-content: center;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
  }
  .ant-tabs-tab-btn {
    color: black;
  }
  .ant-form-item-control-input {
    min-height: 40px;
    text-align-last: center;
  }
`;
export const Flex = styled.div`
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .ant-btn {
    width: 150px;
    height: 32px;
    background-color: #f3c300;
    color: white;
  }
  :where(.css-dev-only-do-not-override-fpg3f5).ant-btn-link:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    color: white;
    background-color: #f3af00;
  }
  :where(.css-dev-only-do-not-override-fpg3f5).ant-btn-default:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    color: white;
    background-color: #f3af00;
  }
`;
