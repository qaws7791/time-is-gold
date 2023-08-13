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
  disabled: boolean | undefined;
  key: string;
  label: string;
  title: string | undefined;
  value: string;
}

const SelectTags: React.FC<Props> = ({ setTag, item }) => {
  const {
    data: allTags,
    isLoading,
    isError
  } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));

  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  // console.log("selectedItems :", selectedItems);

  useEffect(() => {
    if (item) {
      const initialSelectedItems = item.tag((element: string) => {
        let value = "";
        if (element === "edu") value = "magenta";
        else if (element === "work") value = "volcano";
        else if (element === "exercise") value = "green";
        else if (element === "chore") value = "blue";
        else if (element === "entertain") value = "purple";
        const newElement = {
          disabled: undefined,
          key: element,
          label: element,
          title: undefined,
          value
        };
        return newElement;
      });
      setSelectedItems(initialSelectedItems);
    }
  }, []);
  if (isLoading) return <div>로딩중</div>;

  const onChangeSelectItems = (e: Array<Option>) => {
    const tagForDB = e.map(element => element.label);
    console.log("!!!!!!!!!!!!!", e);
    setSelectedItems(e);
    setTag(e);
  };

  const notSelectedItems = allTags.filter((o: string) => {
    // 이것 때문인가.... 첨부터 쓸까.. 바꾸는거 너무 헷갈려... 아니야 난 할 수 있또ㅘ1!!!!!!!!
    // 식곤증...

    return !selectedItems.includes(o);
  });

  const filteredOptions = selectedItems.length >= 3 ? [] : notSelectedItems;

  // let filteredOptions: string[] | undefined = [];
  // if (selectedItems.length >= 3) {
  //   filteredOptions = [];
  // } else {
  //   filteredOptions = OPTIONS.filter((o: TagItemType) => {
  //     return !selectedItems.includes(o.tagName);
  //   }).map(o => {
  //     return o.tagNumber;
  //   });
  // }

  // const labelJSX = `${<div><FaCircle/><span></span></div>}`
  // console.log("?????????", filteredOptions);
  const options = filteredOptions.map((item: string) => {
    // console.log("다시해보자 정신차리아!!!", item);
    let tagColor = "";
    if (item === "edu") tagColor = "magenta";
    else if (item === "work") tagColor = "volcano";
    else if (item === "exercise") tagColor = "green";
    else if (item === "chore") tagColor = "blue";
    else if (item === "entertain") tagColor = "purple";
    // const targetTagfromDB = allTags.find(() => tagObject.tagNumber === item);
    return {
      value: tagColor,
      // value: <Tag color={tagColor}>{targetTagfromDB.tagName}</Tag>,
      label: item
      // (
      // <>
      //   <FaCircle style={{ fill: tagColor }} />
      //   <span>{targetTagfromDB.tagName}</span>
      // </>
      //   <Tag key={item} color={tagColor}>
      //     {item}
      //   </Tag>
      // )
    };
  });

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      placeholder="태그를 추가해보세요"
      value={selectedItems}
      labelInValue
      // onChange={setSelectedItems}
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      options={options}
    />
  );
  // const {
  //   data: allTags,
  //   isLoading,
  //   isError
  // } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));
  // if (isLoading) return <div>ㅠㅠ</div>;
  // if (isError) return <div>오류있음</div>;
  // if (allTags) {
  //   console.log("🎊", allTags);
  // }

  // const options: SelectProps["options"] = [];
  // // options에 넣어줄 tag들 => value의 초기값 빈값, value는 setTags로 state관리 해줘야함
  // // options에 넣어줄 tag들 => label도
  // for (let i = 0; i < allTags.length; i++) {
  //   options.push({
  //     // 이게 select 실제 db로 저장될 값 => 선택되는 거
  //     value: allTags[i],
  //     // value: i.toString(36) + i,

  //     // 이게 select 보여지는 이름
  //     label: allTags[i]
  //     // label: i.toString(36) + i
  //   });
  // }

  // const handleChange = (value: string) => {
  //   // if (value.length > 3) return;
  //   // if (value.length >= 3) setIsDisabled(true);
  //   // if (value.length >= 3) console.log(`selected ${value}`);
  //   // if (value.length < 3) setIsDisabled(false);
  //   console.log(value);
  // };

  // return (
  //   <Select
  //     mode="tags"
  //     style={{ width: "100%" }}
  //     placeholder="Tags Mode"
  //     onChange={handleChange}
  //     options={options}
  //     allowClear={true}
  //   />
  // );
};
// TODO 컴포넌트 분리하기
const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default SelectTags;
