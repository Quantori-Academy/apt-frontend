import { useMemo, useState } from "react";

import { ReagentRequests } from "@/types";

export const useCheckedRows = (rows: ReagentRequests) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const isSelected = (id: string) => selected.has(id);

  const toggleCheckbox = (id: string) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAllClick = (isChecked: boolean) => {
    if (isChecked) {
      setSelected(new Set(rows.map((row) => row.id))); // Select all
    } else {
      setSelected(new Set());
    }
  };

  const selectedRows = useMemo(
    () => rows.filter((row) => selected.has(row.id)),
    [rows, selected]
  );

  return {
    selected: Array.from(selected),
    selectedRows,
    isSelected,
    toggleCheckbox,
    handleSelectAllClick,
    setSelected,
  };
};
