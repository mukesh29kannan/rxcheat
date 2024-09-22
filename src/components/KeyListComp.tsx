'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Tooltip , Skeleton, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteKeyComp from "./DeleteKeyComp";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import ResetDevices from "./ResetDevices";

export default function KeyListComp() {
    const [datas, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tableLoad, setTableLoad] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [search,setSearch] = useState('');
    const [filterData,setFilterData] = useState<any>([]);

    const getTableSkeleton = (row: number[] ,column: number[]) =>{

        return row.map((r)=>(<TableRow key={r}>
                    {column.map((c)=>(
                        <TableCell key={c}>
                            <Skeleton className="w-full h-full rounded-lg">
                                <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                            </Skeleton>
                        </TableCell>) )}
                    </TableRow>))
    }
   
    const getData = async () => {
        try {
            setTableLoad(true);
            const response = await fetch(`/api/key/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: 1 })
            });
            const d = await response.json();
            setData(d.data.keys);
            setUsers(d.data.user);
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setTableLoad(false);
        }
    };

    const apiCall = async (id: any, url: string, message: string) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        if (response.ok) {
            toast.success(message);
            setLoading(false);
            location.reload()
        }
    };

    const block = async (id: any) => {
        setLoading(true);
        await apiCall(id, '/api/key/block', 'Blocked successfully');
    };

    const unBlock = async (id: any) => {
        setLoading(true);
        await apiCall(id, '/api/key/unblock', 'Unblocked successfully');
    };

    const getStatus = (status: any, id: any) => {
        if (status === 1) {
            return (
                <Tooltip content="Block Key">
                    <Button isIconOnly className="bg-transparent" isLoading={loading} onClick={() => block(id)}>
                        <span className="text-lg text-warning bg-transparent cursor-pointer active:opacity-50">
                            <MdBlock />
                        </span>
                    </Button>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip content="Unblock Key">
                    <Button isIconOnly className="bg-transparent" isLoading={loading} onClick={() => unBlock(id)}>
                        <span className="text-lg text-primary bg-transparent cursor-pointer active:opacity-50">
                            <CgUnblock />
                        </span>
                    </Button>
                </Tooltip>
            );
        }
    };

    const getFreshStatus = (validity: any) => (
        <Chip className="capitalize" color={!validity ? 'primary' : 'success'} size="sm" variant="flat">
            {!validity ? 'fresh' : 'used'}
        </Chip>
    );

    const getDate = (date: any) => {
        if (!date) return "-";
        const dateObject = new Date(date);
        return `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()} & ${dateObject.getHours()}:${dateObject.getMinutes()}`;
    };

    const getUserName = (id: string) => users.find((user: any) => user._id === id)?.name;

    useEffect(() => {
        getData();
    }, []);
    useEffect(()=>{
        if(search.length){
            const d:any = datas.filter((d:any)=> d.key.toLowerCase().includes(search.toLowerCase()))
            setFilterData(d)
        }
        else{
            setFilterData(datas)
        }
    },[search,datas])

    return <>
            <div className="mb-2 grid justify-items-end">
                <Input
                    isRequired
                    label="Search"
                    placeholder="Enter key"
                    type="text"
                    className="lg:w-3/12"
                    value={search}
                    onChange={(e) => setSearch( e.target.value )}
                />
            </div>
            <Table layout="auto" aria-label="Keys List Table">
            <TableHeader>
                <TableColumn>GENERATED KEY</TableColumn>
                <TableColumn>EXPIRE AT</TableColumn>
                <TableColumn>VALIDITY</TableColumn>
                <TableColumn>NO DEVICES</TableColumn>
                <TableColumn>DEVICES USED</TableColumn>
                <TableColumn>CREATED BY</TableColumn>
                <TableColumn>GAME</TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader><TableBody emptyContent="No keys to display.">
                    {( tableLoad == true) ? ( getTableSkeleton([1,2,3,4,5],[1,2,3,4,5,6,7,8,9]) ) : filterData?.map((key: any) => (
                        <TableRow key={key?._id}>
                            <TableCell>{key?.key}</TableCell>
                            <TableCell>{getDate(key?.validity)}</TableCell>
                            <TableCell>{key?.period}</TableCell>
                            <TableCell>{key?.noDevices}</TableCell>
                            <TableCell>{key?.deviceId?.length}</TableCell>
                            <TableCell>{key?.game}</TableCell>
                            <TableCell>{getUserName(key?.createdBy)}</TableCell>
                            <TableCell>{getDate(key?.createdAt)}</TableCell>
                            <TableCell>{getFreshStatus(key?.validity)}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center">
                                    <DeleteKeyComp keys={key} />
                                    {getStatus(key?.isActive, key?._id)}
                                    <ResetDevices keys={key} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
        </>
}
