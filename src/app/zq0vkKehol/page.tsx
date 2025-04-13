"use client";

import DeleteUser from "@/components/DeleteUser";
import DeleteUserKeys from "@/components/DeleteUserKeys";
import Logout from "@/components/Logout";
import {
  Button,
  Chip,
  Input,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { BiSolidShieldAlt2 } from "react-icons/bi";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoad, setTableLoad] = useState(true);
  const [search,setSearch] = useState('');
  const [filterData,setFilterData] = useState<any>([]);

  const getTableSkeleton = (row: number[], column: number[]) => {
    return row.map((r) => (
      <TableRow key={r}>
        {column.map((c) => (
          <TableCell key={c}>
            <Skeleton className="w-full h-full rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const getUsers = async () => {
    try {
      setTableLoad(true);
      const response = await fetch(`/api/users/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: 1 }),
      });
      const data = await response.json();
      if (!data?.status) {
        toast.error("Who are you");
        return "";
      }
      setUsers(data.data.users);
      setKeys(data.data.keys);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setTableLoad(false);
    }
  };

  const block = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/block`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),
      });
      if (response.ok) {
        toast.success("User Blocked successfully");
      } else {
        toast.error("Unable to block the user");
      }
      location.reload();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const unBlock = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/unblock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),
      });
      if (response.ok) {
        toast.success("User Blocked successfully");
      } else {
        toast.error("Unable to block the user");
      }
      location.reload();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status: any) => (
    <Chip
      className="capitalize"
      color={status == 1 ? "success" : "danger"}
      size="sm"
      variant="flat"
    >
      {status == 1 ? "Active" : "In-active"}
    </Chip>
  );

  const getBlockStatus = (status: any, id: any) => {
    if (status == 1) {
      return (
        <Tooltip content="Block User">
          <Button
            isIconOnly
            className="bg-transparent"
            isLoading={loading}
            onClick={(e) => block(id)}
          >
            <span className="text-lg text-warning bg-transparent cursor-pointer active:opacity-50">
              <MdBlock />
            </span>
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip content="Unblock User">
          <Button
            isIconOnly
            className="bg-transparent"
            isLoading={loading}
            onClick={(e) => unBlock(id)}
          >
            <span className="text-lg text-primary bg-transparent cursor-pointer active:opacity-50">
              <CgUnblock />
            </span>
          </Button>
        </Tooltip>
      );
    }
  };

  const getLoginProtect = (status:any,id:any) => {
    if(status == 1){
      return <Tooltip content="Release User">
        <Button
            isIconOnly
            className="bg-transparent"
            isLoading={loading}
            onClick={(e) => block(id)}
          >
            <span className="text-lg text-warning bg-transparent cursor-pointer active:opacity-50">
              <BiSolidShieldAlt2 />
            </span>
          </Button>
      </Tooltip>
    }
  }

  const getNoOfKeys = (id: string) =>
    keys?.reduce((acc, cur: any) => (cur?.createdBy === id ? acc + 1 : acc), 0);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(()=>{
    if(search.length){
        const d:any = users.filter((d:any)=> d.name.toLowerCase().includes(search.toLowerCase() || d.username.toLowerCase().includes(search.toLowerCase())))
        setFilterData(d)
    }
    else{
        setFilterData(users)
    }
},[search,users])

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between ">
      </div>
      <div className="py-3">
        {/* <div className="font-semibold text-xl grid justify-items-start">Users</div> */}
        <div className="mb-2 flex justify-between">
        <div className="font-semibold text-xl">Users</div>
          <Input
            isRequired
            label="Search"
            placeholder="Enter name"
            type="text"
            className="lg:w-3/12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table layout="auto" aria-label="Users List Table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>USERNAME</TableColumn>
            {/* <TableColumn>KEY</TableColumn> */}
            <TableColumn>STATUS</TableColumn>
            <TableColumn>NO KEYS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No keys to display."}>
            {tableLoad == true
              ? getTableSkeleton([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])
              : filterData.map((user: any) => (
                  <TableRow key={user?._id}>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    {/* <TableCell>{user?.key}</TableCell> */}
                    <TableCell>{getStatus(user?.isActive)}</TableCell>
                    <TableCell>{getNoOfKeys(user?._id)}</TableCell>
                    <TableCell>
                      <div className="relative flex items-center ">
                        {getBlockStatus(user?.isActive, user?._id)}
                        <DeleteUser keys={user} />
                        <DeleteUserKeys keys={user} />
                        <Logout id={user?._id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
