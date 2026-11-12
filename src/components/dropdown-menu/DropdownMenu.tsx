import { useEffect, useRef, useState, type ReactNode } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import type { MenuItem } from "src/types/MenuItem";

import "./MyDropdownMenu.sass";

type Props = {
  items: MenuItem[];
  mainIcon?: ReactNode;
  placement?: "bottom-start" | "bottom-end" | "left" | "right";
  className?: string;
  menuClassName?: string;
};

export default function MyDropdownMenu({
  items,
  mainIcon = <IoEllipsisVerticalSharp />,
  placement = "bottom-end",
  className = "",
  menuClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.filter((item) => !item.hide);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleAction = (item: MenuItem) => {
    item.onClick();
    setOpen(false);
  };

  if (!visibleItems.length) return null;

  return (
    <div ref={menuRef} className={`my-dropdown-menu ${className}`}>
      <button
        type="button"
        className="my-dropdown-menu__trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        {mainIcon}
      </button>

      {open && (
        <div
          className={`my-dropdown-menu__panel my-dropdown-menu__panel--${placement} ${menuClassName}`}
          role="menu"
        >
          {visibleItems.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="my-dropdown-menu__item "
              onClick={() => handleAction(item)}
            >
              {item.icon && (
                <span className="my-dropdown-menu__icon">{item.icon}</span>
              )}

              <span className="my-dropdown-menu__label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
