import { useState } from "react";

import { ReagentRequests } from "@/types";

export const useCheckedRows = (rows: ReagentRequests) => {
  const [selected, setSelected] = useState<Set<ReagentRequests[number]>>(new Set());

  const isSelected = (id: string) => {
    return !!Array.from(selected).find((row) => row.id === id);
  };

  const toggleCheckbox = (id: string) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);
      const row = rows.find((row) => row.id === id);
      if (row) {
        if (newSelected.has(row)) {
          newSelected.delete(row);
        } else {
          newSelected.add(row);
        }
      }
      return newSelected;
    });
  };

  const handleSelectAllClick = (isChecked: boolean) => {
    if (isChecked) {
      setSelected(new Set(rows));
    } else {
      setSelected(new Set());
    }
  };

  return {
    selected: Array.from(selected),
    isSelected,
    toggleCheckbox,
    handleSelectAllClick,
    setSelected,
  };
};
