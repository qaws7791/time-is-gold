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
export const LogInTabs = styled.div`
  display: grid;
  grid-column: 2/3;
  width: 417px;
  height: 467px;
  text-align: center;
  align-items: center;
  .ant-form-item{
    margin-bottom:18px;
  }
  .ant-tabs-nav-wrap{
    background-color:#F0F2F5;
  }
  .ant-form-item-control-input{
    min-height:40px;
    text-align-last: center;
  }
`;
export const Flex = styled.div`
  .ant-form-item-control-input-content{
  display: flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  }
  .ant-btn{
    width:150px;
    height:32px;
  }
`;