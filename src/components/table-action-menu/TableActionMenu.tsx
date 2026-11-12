import type { ReactNode } from "react";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { Code } from "lucide-react";

import type { ActionType, TableMenuItem } from "src/types/MenuItem";

import MyDropdownMenu from "../dropdown-menu/DropdownMenu";

type Props = {
  items: TableMenuItem[];
  placement?: "bottom-start" | "bottom-end" | "left" | "right";
  mainIcon?: ReactNode;
};

export default function TableActionMenu({
  items,
  placement = "bottom-end",
  mainIcon,
}: Props) {
  const defaultActionIcons: Record<ActionType, ReactNode> = {
    view: <BiLinkExternal />,
    edit: <FiEdit />,
    delete: <RiDeleteBin2Line />,
  };

  const getActionIcon = (item: TableMenuItem) => {
    if (item.icon) return item.icon;
    if (item.type) return defaultActionIcons[item.type];
    return <Code />;
  };

  const visibleItems = items.filter((item) => !item.hide);

  const standAloneItems = visibleItems.filter((item) => item.standAlone);

  const menuItems = visibleItems.filter((item) => !item.standAlone);

  return (
    <div className="flex gap-3 items-center content-between">
      {standAloneItems.map((item) => (
        <button
          key={item.label}
          type="button"
          className=""
          title={item.label}
          onClick={item.onClick}
        >
          {getActionIcon(item)}
        </button>
      ))}

      <MyDropdownMenu
        items={menuItems.map((item) => ({
          label: item.label,
          icon: getActionIcon(item),
          onClick: item.onClick,
        }))}
        mainIcon={mainIcon}
        placement={placement}
      />
    </div>
  );
}
