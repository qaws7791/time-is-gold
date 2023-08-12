import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "api/tags";
import { ITodo } from "supabase/database.types";
import { FaCircle } from "react-icons/fa";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  item?: ITodo;
}
interface TagItemType {
  tagName: string;
  tagNumber: string;
}

const SelectTags: React.FC<Props> = ({ setTag, item }) => {
  const {
    data: allTags,
    isLoading,
    isError
  } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));

  const [selectedItems, setSelectedItems] = useState<string[]>(item?.tag || []);

  if (isLoading) return <div>로딩중</div>;
  const OPTIONS: TagItemType[] = allTags;

  const onChangeSelectItems = (e: string[]) => {
    setSelectedItems(e);
    setTag(e);
  };

  let filteredOptions: string[] | undefined = [];
  if (selectedItems.length >= 3) {
    filteredOptions = [];
  } else {
    filteredOptions = OPTIONS.filter((o: TagItemType) => {
      let compareItem: string = o.tagNumber;
      return !selectedItems.includes(compareItem);
    }).map(o => {
      return o.tagNumber;
    });
  }

  // const labelJSX = `${<div><FaCircle/><span></span></div>}`

  return (
    <Select
      mode="multiple"
      placeholder="태그를 추가해보세요"
      value={selectedItems}
      // onChange={setSelectedItems}
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      options={filteredOptions.map((item: string) => {
        let tagColor = "";
        if (item === "1") tagColor = "#FFD1DF";
        else if (item === "2") tagColor = "#FFE0B2";
        else if (item === "3") tagColor = "#D0F0C0";
        else if (item === "4") tagColor = "#B3E0FF";
        else if (item === "5") tagColor = "#E6CCE6";
        const targetTagfromDB = allTags.find(
          (tagObject: TagItemType) => tagObject.tagNumber === item
        );
        return {
          value: item,
          // value: "이거를 보여주나봐",
          // value: "이거를 보여주나봐",
          label: (
            <>
              <FaCircle style={{ fill: tagColor }} />
              <span>{targetTagfromDB.tagName}</span>
            </>
          )
        };
      })}
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

export default SelectTags;
