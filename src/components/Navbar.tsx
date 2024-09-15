"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Skeleton,
  DropdownItem,
  DropdownMenu,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { handleLogout } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { PiGameControllerFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function NavbarComp() {
  const router = useRouter();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const name = localStorage.getItem("user");
    setUser(name);
  }, []);
  const logOut = async () => {
    toast.success('See you soon! 👋')
    await handleLogout();
    router.push("/");
  };

  return (
    <Navbar
      maxWidth="full"
      classNames={{ base: "border-1 border-b-primary-300" }}
    >
      <NavbarBrand>
        <span className=" mr-2">
          <PiGameControllerFill />
        </span>
        <p className="font-bold text-inherit">RX Cheat</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              {user.length ? (
                <Button variant="flat" color="primary" className={`capitalize`}>
                  {user}
                </Button>
              ) : (
                <div>
                  <Skeleton className="flex rounded-full w-10 h-10 drop-shadow-md" />
                </div>
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                isReadOnly
                key="profile"
                className="h-14 gap-2 opacity-100"
              >
                <User
                  name={user}
                  description="rx cheat user 🎮"
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "/assets/images/profile-circle.svg",
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onClick={logOut}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
