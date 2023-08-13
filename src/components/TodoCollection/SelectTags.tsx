import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import React, { useState } from "react";
import { getTags } from "supabase/tags";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTags: React.FC<Props> = ({ setTag }) => {
  const { data: allTags, isLoading } = useQuery(["TagsCollection"], () =>
    getTags("jieun2563@naver.com")
  );

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
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      options={filteredOptions.map((item: string) => ({
        value: item,
        label: item
      }))}
    />
  );
};

export default SelectTags;
