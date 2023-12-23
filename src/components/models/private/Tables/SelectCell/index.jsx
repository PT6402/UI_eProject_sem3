/* eslint-disable react/prop-types */
import { useState } from "react";
import { UIBox, UISelect } from "../../../../common";

export default function SelectCell({ listSelect, defaultSelect }) {
  const [value, setValue] = useState({
    value: defaultSelect.value,
    label: defaultSelect.label,
  });
  console.log(value);
  return (
    <UIBox display="flex" alignItems="center">
      <UISelect
        defaultValue={{
          value: defaultSelect.value,
          label: defaultSelect.label,
        }}
        options={listSelect.map((item) => ({
          value: item.value,
          label: item.label,
        }))}
        onChange={({ value, label }) => setValue({ value, label })}
        size="small"
      />
    </UIBox>
  );
}
