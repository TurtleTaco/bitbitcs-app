import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBookOpen, FaSearch, FaUserCheck } from "react-icons/fa"; // Import the icons
import { styled } from "styletron-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const ProfileContainer = styled("div", {
  fontWeight: "600",
});

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", icon: FaHome, label: "Home" },
    { href: "/learn", icon: FaBookOpen, label: "Learn" },
    { href: "/search", icon: FaSearch, label: "Search" },
    { href: "/profile", icon: FaUserCheck, label: "Profile" },
  ];

  const handleNavClick = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.error("Haptics not supported", error);
    }
  };

  return (
    <ProfileContainer>
      <nav className="bg-white border-t border-gray-200 w-full">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                pathname === href
                  ? "text-black-600 font-semibold"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={handleNavClick}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </ProfileContainer>
  );
};

export default BottomNav;
