'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteKey from "./deleteKey";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import ResetDevices from "./ResetDevices";

export default function KeyList() {
    const [datas, setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState<any>([]);
    const getData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/key/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: 1 })
            });
            const d = await response.json();
            setData(d.data.keys)
            setUsers(d.data.user)
        } catch (err) {
            toast.error('Something went wrong')

        }finally{
            setLoading(false)
        }

    }

    const apiCall = async (id: any, url: any,message:string) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        if(response.ok){
            toast.success(message)
        }
        getData()
    }
    const block = async (id: any) => {
        await apiCall(id, '/api/key/block','Blocked sucessfully')
    }
    const unBlock = async (id: any) => {
        await apiCall(id, '/api/key/unblock','Unblocked sucessfully')
    }


    const getStatus = (status: any, id: any) => {
        if (status == 1) {
            return (<Tooltip content="Block Key"><Button isIconOnly className="bg-transparent" isLoading={loading} onClick={(e) => block(id)}><span className="text-lg text-warning bg-transparent cursor-pointer active:opacity-50"><MdBlock/></span></Button></Tooltip>)
        }
        else {
            return (<Tooltip content="Unblock Key"><Button isIconOnly className="bg-transparent" isLoading={loading} onClick={(e) => unBlock(id)}><span className="text-lg text-primary bg-transparent cursor-pointer active:opacity-50"><CgUnblock/></span></Button></Tooltip>)
        }
    }

    const getFreshStatus = (validity:any) =><Chip className="capitalize" color={!validity ? 'primary' : 'success'} size="sm" variant="flat">
            {!validity ? 'fresh' : 'used'}
        </Chip>
    const getDate = (date: any) => {
        if(!date) return "-"
        const dateObject = new Date(date);
        return (`${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()} & ${dateObject.getHours()}:${dateObject.getMinutes()}`)
    }
    const getUserName = (id:string) => users.find((user:any)=>user._id == id)?.name

    useEffect(() => {
        getData();
    }, [])

    return (
        <Table layout="auto" aria-label="Keys List Table">
            <TableHeader>
                <TableColumn>GENERATED KEY</TableColumn>
                <TableColumn>EXPIRE AT</TableColumn>
                <TableColumn>VALIDITY</TableColumn>
                <TableColumn>NO DEVICES</TableColumn>
                <TableColumn>DEVICES USED</TableColumn>
                <TableColumn>CREATED BY</TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody isLoading={loading} emptyContent={"No keys to display."}>
                {datas.map((key: any) => (
                    <TableRow key={key?._id}>
                        <TableCell>{key?.key}</TableCell>
                        <TableCell>{getDate(key?.validity)}</TableCell>
                        <TableCell>{key?.period}</TableCell>
                        <TableCell>{key?.noDevices}</TableCell>
                        <TableCell>{key?.deviceId?.length}</TableCell>
                        <TableCell>{getUserName(key?.createdBy)}</TableCell>
                        <TableCell>{getDate(key?.createdAt)}</TableCell>
                        <TableCell>{getFreshStatus(key?.validity)}</TableCell>
                        <TableCell>
                            <div className="relative flex items-center ">
                                <DeleteKey keys={key}/>
                                {getStatus(key?.isActive, key?._id)}
                                <ResetDevices keys={key}/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
