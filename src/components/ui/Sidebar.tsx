import { Button } from "../common";
import { Moon } from "lucide-react";
import { useTheme } from "@/context";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full lg:w-25.75 bg-(--sidebar-bg) h-18 sm:h-20 lg:h-full lg:rounded-tr-[20px] lg:rounded-br-[20px] flex justify-between lg:flex-col">
      <div className="h-18 max-w-18 sm:h-20 sm:max-w-20 lg:h-25.75 w-full lg:max-w-25.75 relative flex justify-center items-center lg:p-8">
        <div className="flex absolute bg-(--accent-primary) h-full w-full rounded-tr-[20px] rounded-br-[20px]"></div>
        <img src="/logo.png" alt="Logo" className="z-30 max-w-full" />
        <div className="flex absolute bg-(--accent-primary-hover) bottom-0 z-10 h-1/2 w-full rounded-tl-[20px] rounded-br-[20px]"></div>
      </div>
      <div className="flex lg:flex-col">
        <div className="flex justify-center items-center py-6 px-8 max-lg:border-r-2 max-lg:border-r-(--hr-color) lg:border-b-2 lg:border-b-(--hr-color)">
          <Button
            variant="edit"
            size="sm"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-8 w-8 lg:h-10 lg:w-10 rounded-full p-0! bg-transparent! hover:bg-transparent!"
          >
            {theme === "dark" ? (
              <div className="h-4 w-4 rounded-full bg-(--theme-icon) hover:bg-(--theme-icon-hover) transition-colors duration-300" />
            ) : (
              <Moon
                className="text-(--theme-icon) fill-(--theme-icon) hover:text-(--theme-icon-hover) transition-colors duration-300 hover:fill-(--theme-icon-hover)"
                size={20}
              />
            )}
          </Button>
        </div>
        <div className="flex justify-center items-center py-6 px-8">
          <img
            src="/avatar-icon.png"
            alt="avatar-icon"
            aria-label="avatar icon"
            className="flex h-8 lg:h-10 w-8 lg:w-10 rounded-full bg-amber-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
