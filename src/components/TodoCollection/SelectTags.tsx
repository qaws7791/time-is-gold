import { Select, Tag } from "antd";
import { allTags } from "components/PageLayout/Sidebar/tag.data";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { cloneElement, useEffect, useState } from "react";
import type { ITodo } from "supabase/database.types";

interface Props {
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  item?: ITodo;
}
interface Option {
  key: string;
  label: JSX.Element;
  value: string;
  color?: string | null;
}
interface allTagsType {
  [key: string]: string;
}

const SelectTags: React.FC<Props> = ({ setTag, item }) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const setTagComponent = (item: allTagsType) => {
    const { value, label } = item;
    return {
      key: value,
      value,
      label: (
        <Tag key={label} color={value}>
          {label}
        </Tag>
      )
    };
  };

  const mappingTag = allTags.map(setTagComponent);

  useEffect(() => {
    if (item && item.tag && item.tag.length > 0) {
      const initialSelectedItems = mappingTag.filter(element => {
        const findTarget = element.label.key;

        const findTag = item.tag?.find(tagValue => tagValue === findTarget);

        return findTag !== undefined;
      });

      setSelectedItems(initialSelectedItems);

      setTag(item.tag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, setTag]);

  const onChangeSelectItems = (values: Option[]) => {
    if (!values) return;

    const tagArrForDB = values.map(element => String(element.label.key));

    setTag(tagArrForDB);
    setSelectedItems(values);
  };

  const unSelectedTag = mappingTag.filter(optionItem => {
    const findTarget = optionItem.label.key;

    const findTag = selectedItems.find(selectedItem => selectedItem.label.key === findTarget);

    return findTag === undefined;
  });

  const options = selectedItems.length >= 3 ? [] : unSelectedTag;

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

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const labelWithFuc = cloneElement(label as React.ReactElement, {
    onMouseDown: onPreventMouseDown,
    closable,
    onClose,
    style: { marginRight: 3 }
  });
  return <>{labelWithFuc}</>;
};

export default SelectTags;
