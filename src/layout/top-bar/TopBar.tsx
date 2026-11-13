import { useLocation, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { ROUTES } from "src/services/appRoutes/routes";
import { sidebarNavigationData } from "../sidebar/SidebarNavigation";
import MyDropdownMenu from "src/components/dropdown-menu/DropdownMenu";
import { Menu } from "lucide-react";

const TopBar = () => {
  const activePath = useLocation().pathname;
  const getPageTitle = (path: string) => {
    const route = Object.values(ROUTES).find((route) => route.path === path);
    return route ? route.title : "";
  };
  const navigate = useNavigate();
  const menus = sidebarNavigationData.map((nav) => ({
    ...nav,
    onClick: () => navigate(nav.path),
    icon: <nav.icon />,
  }));

  return (
    <div className="p-2 px-4 flex justify-between  top-bar">
      <MyDropdownMenu
        placement="bottom-start"
        mainIcon={<Menu />}
        items={menus}
        className="top-bar-menu-dropdown"
      />
      <div className="top-bar-title">{getPageTitle(activePath)}</div>
      <div className="text-2xl">
        <MyDropdownMenu
          placement="bottom-end"
          mainIcon={<RxAvatar />}
          items={[
            {
              icon: "W",
              label: String(window.innerWidth),
              onClick: () => {},
            },
            {
              icon: "H",
              label: String(window.innerHeight),
              onClick: () => {},
            },
          ]}
        />
        {/* <RxAvatar /> */}
      </div>
    </div>
  );
};

export default TopBar;
