import React, { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "api/tags";
import { ITodo } from "supabase/database.types";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  item?: ITodo;
}

interface Option {
  disabled?: boolean | undefined;
  key?: string;
  // label: string;
  label: JSX.Element;
  // label: any;
  title?: string | undefined;
  value: string;
}

interface allTagsType {
  [key: string]: string;
}

// 수정 form에서 서버에 저장된 item의 tag를 불러올때.. 잘 집어넣어주려면 (집어넣어주기 편한 형태...)
const SelectTags: React.FC<Props> = ({ setTag, item }) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const allTags = [
    { label: "edu", value: "magenta" },
    { label: "work", value: "volcano" },
    { label: "exercise", value: "green" },
    { label: "chore", value: "blue" },
    { label: "entertain", value: "purple" }
  ];

  //test
  // const selectedItems = ["select tag value 값"];

  //test
  // const options = [{ label: "options label값", value: "options value값" }];

  const onChangeSelectItems = (e: Option[]) => {
    console.log("클릭한 태그 보여줌 e값", e);
    // db에 넘겨줄 때는 e배열의 각 배열요소에서 'label'만 다 담은 배열 형태를 저장해주면됨
    if (!e) return;
    const tagArrForDB = e.map(element => {
      console.log(typeof element.label.key);
      return String(element.label.key);
    });
    setTag(tagArrForDB);

    // selectedItems로 'select의 value'랑 options 따로 구분해야하나.......... 일단은 label만 담아본다
    setSelectedItems(e);
  };

  // const options = filteredOptions.map((item: string) => {
  let options = allTags.map((item: allTagsType) => {
    return {
      value: item.value,
      // value: <Tag color={tagColor}>{targetTagfromDB.tagName}</Tag>,
      label: (
        <Tag key={item.label} color={item.value}>
          {item.label}
        </Tag>
      )
    };
  });

  // 살려줘...
  const unSelectedOptions = options.filter(optionItem => {
    let isHere = selectedItems.find(selectedItem => {
      return selectedItem.label.key === optionItem.label.key;
    });
    return isHere === undefined ? true : false;
  });
  selectedItems.length >= 3 ? (options = []) : (options = unSelectedOptions);

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      placeholder="태그를 추가해보세요"
      value={selectedItems} // 선택한 값 담아주는 곳 => 드롭다운 젤 위에 보여줌???? => tagRender에 보여줄 값 넣어주는
      // value={"여기"} // for DB?
      labelInValue
      // onChange={setSelectedItems}
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      // options={options} // only for tagRender
      options={options} // only for tagRender => 드롭다운 할 거 담긴 곳?? => 여기정보 눌렀을 때 value setting 되는 듯? => 그럼 일단 selectedItems는 수정 컴포넌트 외에는 항상 초기값이 빈배열 => options 를 selected 가 change 될때마다 변경해주면 됨.
    />
  );
};

// TODO 컴포넌트 분리하기
const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }; // 짱이다 잘한다 근데 뭐만들고 계세여 내 newLabel 돌려주세여
  const labelWithFuc = React.cloneElement(label as React.ReactElement, {
    onMouseDown: onPreventMouseDown,
    closable,
    onClose,
    style: { marginRight: 3 }
  });
  return <>{labelWithFuc}</>;
};

// const tagRender = (props: CustomTagProps) => {
//   const { label, value, closable, onClose } = props;
//   console.log("label임", label);
//   console.log("value임", value);
//   let newLabel = "";
//   if (value === "magenta") newLabel = "edu";
//   else if (value === "volcano") newLabel = "work";
//   else if (value === "green") newLabel = "exercise";
//   else if (value === "blue") newLabel = "chore";
//   else if (value === "purple") newLabel = "entertain";

//   const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   return (
//     <Tag
//       color={value}
//       onMouseDown={onPreventMouseDown}
//       closable={closable}
//       onClose={onClose}
//       style={{ marginRight: 3 }}
//     >
//       {newLabel}
//     </Tag>
//   );
// };

export default SelectTags;
