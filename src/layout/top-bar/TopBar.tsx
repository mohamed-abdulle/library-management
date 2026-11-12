import { useLocation } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { ROUTES } from "src/services/appRoutes/routes";
import ActionMenu from "src/components/dropdown-menu/DropdownMenu";

const TopBar = () => {
  const activePath = useLocation().pathname;
  const getPageTitle = (path: string) => {
    const route = Object.values(ROUTES).find((route) => route.path === path);
    return route ? route.title : "";
  };

  return (
    <div className="p-2 px-4 flex justify-between  top-bar">
      <div className="top-bar-title">{getPageTitle(activePath)}</div>
      <div className="text-2xl">
        <ActionMenu
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
