import { forwardRef, useState } from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";
import OffertoryData from "./OfferToryData";
import { useEffect } from "react";

const data = OffertoryData;
const SelectItem = forwardRef(function Item(props, ref) {
  const { image, label, description, ...others } = props;

  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );
});

function CustomSelect({ setCategoryState, donationsList, donation }) {
  const [updatedList, setUpdatedList] = useState(data);
  const [category, setCategory] = useState(donation?.category);
  // console.log(
  //   "🚀 ~ file: CustomeSelect.jsx:26 ~ CustomSelect ~ donationsList:",
  //   donationsList
  // );

  const handleSelectionList = () => {
    const filteredList = data.map((item1) => {
      if (donationsList.find((item2) => item2.category === item1.value)) {
        return {
          ...item1,
          disabled: true,
        };
      }
      return { ...item1, disabled: false };
    });
    setUpdatedList(filteredList);
  };
  useEffect(() => {
    handleSelectionList();
  }, [donationsList]);
  const handleChange = (value) => {
    setCategoryState(value);
    setCategory(value);
  };
  return (
    <Select
      placeholder="Select Category for your Contribution"
      itemComponent={SelectItem}
      data={updatedList}
      searchable
      value={category}
      maxDropdownHeight={400}
      nothingFound="Category not found"
      onChange={(value) => {
        handleChange(value);
      }}
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
export default CustomSelect;
