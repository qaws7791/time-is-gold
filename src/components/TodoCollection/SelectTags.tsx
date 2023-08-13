import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "supabase/tags";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTags: React.FC<Props> = ({ setTag }) => {
  const {
    data: allTags,
    isLoading,
    isError
  } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (isLoading) return <div>로딩중</div>;
  const OPTIONS = allTags;

  const onChangeSelectItems = (e: string[]) => {
    setSelectedItems(e);
    setTag(e);
  };

  const filteredOptions =
    selectedItems.length >= 3 ? [] : OPTIONS.filter((o: string) => !selectedItems.includes(o));

  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      // onChange={setSelectedItems}
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      options={filteredOptions.map((item: string) => ({
        value: item,
        label: item
      }))}
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
