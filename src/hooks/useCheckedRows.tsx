import { useMemo, useState } from "react";

import { ReagentRequests } from "@/types";

export const useCheckedRows = (rows: ReagentRequests) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  const isSelected = (id: string) => selected.includes(id);

  const handleCheckboxClick = (id: string) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(id);
      let newSelected: Array<string> = [];

      if (selectedIndex === -1) {
        newSelected = [...prevSelected, id];
      } else if (selectedIndex === 0) {
        newSelected = prevSelected.slice(1);
      } else if (selectedIndex === prevSelected.length - 1) {
        newSelected = prevSelected.slice(0, -1);
      } else if (selectedIndex > 0) {
        newSelected = [
          ...prevSelected.slice(0, selectedIndex),
          ...prevSelected.slice(selectedIndex + 1),
        ];
      }

      return newSelected;
    });
  };

  const handleSelectAllClick = (isChecked: boolean) => {
    if (isChecked) {
      setSelected(rows.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const selectedRows = useMemo(
    () => rows.filter((row) => selected.includes(row.id)),
    [rows, selected]
  );

  return {
    selected,
    selectedRows,
    isSelected,
    handleCheckboxClick,
    handleSelectAllClick,
    setSelected,
  };
};
