import { Select, Tag } from "antd";
import { allTags } from "components/PageLayout/Sidebar/tag.data";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import React, { useState } from "react";
import { ITodo } from "supabase/database.types";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  item?: ITodo;
}
interface Option {
  disabled?: boolean | undefined;
  key?: string;
  label: JSX.Element;
  title?: string | undefined;
  value: string;
}

interface allTagsType {
  [key: string]: string;
}

const SelectTags: React.FC<Props> = ({ setTag, item }) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const onChangeSelectItems = (e: Option[]) => {
    if (!e) return;
    const tagArrForDB = e.map(element => String(element.label.key));
    setTag(tagArrForDB);
    setSelectedItems(e);
  };

  let options = allTags.map((item: allTagsType) => {
    return {
      value: item.value,
      label: (
        <Tag key={item.label} color={item.value}>
          {item.label}
        </Tag>
      )
    };
  });

  const unSelectedOptions = options.filter(optionItem => {
    let isHere = selectedItems.find(
      selectedItem => selectedItem.label.key === optionItem.label.key
    );
    return isHere === undefined ? true : false;
  });
  selectedItems.length >= 3 ? (options = []) : (options = unSelectedOptions);

  return (
    <Select
      mode="multiple"
      placeholder="태그를 추가해보세요"
      value={selectedItems}
      tagRender={tagRender}
      labelInValue
      onChange={onChangeSelectItems}
      style={{ width: "100%" }}
      options={options}
    />
  );
};

// TODO 컴포넌트 분리하기
const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const labelWithFuc = React.cloneElement(label as React.ReactElement, {
    onMouseDown: onPreventMouseDown,
    closable,
    onClose,
    style: { marginRight: 3 }
  });
  return <>{labelWithFuc}</>;
};

export default SelectTags;
