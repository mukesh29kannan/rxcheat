"use client"
import { Input, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GetLogs() {

  const [search, setSearch] = useState('');
  const [tableLoad, setTableLoad] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filterData, setFilterData] = useState<any>([]);

  const getLogs = async () => {
    try {
      setTableLoad(true);
      const response = await fetch(`/api/getLogs`, {
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
      setLogs(data.data);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setTableLoad(false);
    }
  };

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

  useEffect(() => {
    history?.pushState(null, "", '/getLogs');
    getLogs();
  }, [])

  useEffect(() => {
    if (search.length) {
      const d: any = logs.filter((d: any) => d.name.toLowerCase().includes(search.toLowerCase()))
      setFilterData(d)
    }
    else {
      setFilterData(logs)
    }
  }, [search, logs])

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between ">
      </div>
      <div className="py-3">
        <div className="mb-2 flex justify-between">
          <div className="font-semibold text-xl">Logs</div>
          <Input
            isRequired
            label="Search"
            placeholder="Enter logs"
            type="text"
            className="lg:w-3/12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table layout="auto" aria-label="Logs List Table">
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Success</TableColumn>
            <TableColumn>Failed</TableColumn>
            <TableColumn>Bad Request</TableColumn>
            <TableColumn>No Key</TableColumn>
            <TableColumn>In Active</TableColumn>
            <TableColumn>Down User</TableColumn>
            <TableColumn>Invalid Game</TableColumn>
            <TableColumn>Device Reached</TableColumn>
            <TableColumn>Expired Key</TableColumn>
            <TableColumn>Total</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No keys to display."}>
            {tableLoad == true
              ? getTableSkeleton([1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
              : filterData.map((user: any) => (
                <TableRow key={user?._id}>
                  <TableCell>{user?.date}</TableCell>
                  <TableCell>{user?.count?.success}</TableCell>
                  <TableCell>{user?.count?.failed}</TableCell>
                  <TableCell>{user?.count?.badRequest}</TableCell>
                  <TableCell>{user?.count?.noKey}</TableCell>
                  <TableCell>{user?.count?.isActiveFailed}</TableCell>
                  <TableCell>{user?.count?.isDownUser}</TableCell>
                  <TableCell>{user?.count?.inValidGame}</TableCell>
                  <TableCell>{user?.count?.maxDevice}</TableCell>
                  <TableCell>{user?.count?.expiredKey}</TableCell>
                  <TableCell>{user?.count?.total}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}