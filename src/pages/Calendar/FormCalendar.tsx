import { FormEvent, useState } from "react";
import { styled } from "styled-components";
import { postData } from "supabase/db";

export interface IScheduleValue {
  email: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

const InitValue = {
  email: "",
  title: "",
  start: "",
  end: "",
  backgroundColor: ""
};

// TODO 스케쥴 카테고리 색상 5개 선택
// type IColorValue = "#ffffff" | "#000000" | "#727272";

const FormCalendar = () => {
  // TODO: modal UI 완성되면 그쪽으로 옮기기
  const [inputValue, setInputValue] = useState(InitValue);
  console.log("inputValue :", inputValue);

  // TODO: modal UI 완성되면 그쪽으로 옮기기
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  //React.FormEventHandler<HTMLFormElement>
  // TODO: modal UI 완성되면 그쪽으로 옮기기
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postData(inputValue);
  };

  const register = (name: keyof IScheduleValue) => ({
    id: name,
    name,
    value: inputValue[name],
    onChange
  });

  const colorRegister = (color: string) => ({
    id: color,
    type: "radio",
    name: "backgroundColor",
    value: color,
    onChange
  });

  return (
    <>
      {/* TODO: POST Modal */}
      <StyleForm onSubmit={event => onSubmit(event)}>
        <p style={{ color: "red" }}>Post 모달에 들어갈 Form</p>
        <label htmlFor="email">email</label>
        <input {...register("email")} />
        <label htmlFor="title">title</label>
        <input {...register("title")} />
        <label htmlFor="start">start</label>
        <input {...register("start")} />
        <label htmlFor="end">end</label>
        <input {...register("end")} />

        <FlexBox>
          <label htmlFor="white">white</label>
          <input {...colorRegister("white")} />
          <label htmlFor="black">black</label>
          <input {...colorRegister("black")} />
          <label htmlFor="red">red</label>
          <input {...colorRegister("red")} />
          <label htmlFor="green">green</label>
          <input {...colorRegister("green")} />
          <label htmlFor="blue">blue</label>
          <input {...colorRegister("blue")} />
        </FlexBox>
        <button>작성하기</button>
      </StyleForm>

      {/* TODO: PATCH Modal */}
      <StyleForm>
        <p style={{ color: "red" }}>Patch 모달에 들어갈 Form</p>
        <label htmlFor="title">title</label>
        <input {...register("title")} />
        <label htmlFor="start">start</label>
        <input {...register("start")} />
        <label htmlFor="end">end</label>
        <input {...register("end")} />
        <FlexBox>
          <label htmlFor="white">white</label>
          <input {...colorRegister("white")} />
          <label htmlFor="black">black</label>
          <input {...colorRegister("black")} />
          <label htmlFor="red">red</label>
          <input {...colorRegister("red")} />
          <label htmlFor="green">green</label>
          <input {...colorRegister("green")} />
          <label htmlFor="blue">blue</label>
          <input {...colorRegister("blue")} />
        </FlexBox>
        <ButtonBox>
          <button>수정하기</button>
          <button>삭제하기</button>
        </ButtonBox>
      </StyleForm>
    </>
  );
};
export default FormCalendar;

const StyleForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 50px;
`;

const FlexBox = styled.div`
  display: flex;
`;

const ButtonBox = styled(FlexBox)`
  gap: 10px;
`;
