import type { ReactNode } from "react";

export type ActionType = "view" | "edit" | "delete";

export type TableMenuItem = MenuItem & {
  type?: ActionType;
  standAlone?: boolean;
};
export type MenuItem = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  hide?: boolean;
};
