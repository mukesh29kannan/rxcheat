"use client"

import DeleteUser from "@/components/DeleteUser";
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";

export default function UsersList(){
    const [users,setUsers] = useState([]);
    const [keys,setKeys] = useState([]);
    const [loading,setLoading]= useState(true);

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/users/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: 1 })
            });
            const data = await response.json();
            if(!data?.status){
                toast.error('Who are you')
                return ""
            }
            setUsers(data.data.users)
            setKeys(data.data.keys)
        } catch (err) {
            toast.error('Something went wrong')

        }finally{
            setLoading(false)
        }
    }

    const block = async (id:string) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/users/block`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: id })
            });
            if(response.ok){
                toast.success("User Blocked successfully")
            }
            else{
                toast.error('Unable to block the user')
            }
            getUsers();
        } catch (err) {
            toast.error('Something went wrong')

        }finally{
            setLoading(false)
        }
    }

    const unBlock = async (id:string) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/users/unblock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: id })
            });
            if(response.ok){
                toast.success("User Blocked successfully")
            }
            else{
                toast.error('Unable to block the user')
            }
            getUsers();
        } catch (err) {
            toast.error('Something went wrong')

        }finally{
            setLoading(false)
        }
    }

    const getStatus = (status:any) =><Chip className="capitalize" color={status == 1 ? 'success' : 'danger'} size="sm" variant="flat">
            {status == 1 ? 'Active' : 'In-active'}
        </Chip>
    
    const getBlockStatus = (status: any, id: any) => {
        if (status == 1) {
            return (<Tooltip content="Block User"><Button isIconOnly className="bg-transparent" isLoading={loading} onClick={(e) => block(id)}><span className="text-lg text-warning bg-transparent cursor-pointer active:opacity-50"><MdBlock/></span></Button></Tooltip>)
        }
        else {
            return (<Tooltip content="Unblock User"><Button isIconOnly className="bg-transparent" isLoading={loading} onClick={(e) => unBlock(id)}><span className="text-lg text-primary bg-transparent cursor-pointer active:opacity-50"><CgUnblock/></span></Button></Tooltip>)
        }
    }

    const getNoOfKeys = (id:string) => keys.reduce((acc, cur:any) => cur?.createdBy === id ? acc + 1 : acc, 0);

    useEffect(()=>{
        getUsers();
    },[])

    return <div className="px-4 py-2">
                <div className="flex justify-between ">
                    <div className="font-semibold ">Users</div>
                </div>
                <div className="py-3">
                    <Table layout="auto" aria-label="Users List Table">
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>USERNAME</TableColumn>
                            {/* <TableColumn>KEY</TableColumn> */}
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>NO KEYS</TableColumn>
                            <TableColumn>ACTION</TableColumn>
                        </TableHeader>
                        <TableBody isLoading={loading} emptyContent={"No keys to display."}>
                                {
                                    users.map((user:any)=>(
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
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                        </TableBody>
                    </Table>
                </div>
            </div>
}