'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteKey from "./deleteKey";
import { useSession } from "next-auth/react";

export default function KeyList() {
    const { data: session, status } = useSession();
    const [datas, setData] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        console.log("session?.user?",session?.user);
    },[data])
    const getData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/key/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: session?.user?.id })
            });
            const d = await response.json();
            setData(d.data)
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
            return (<Button size='sm' isLoading={loading} color="danger" onClick={(e) => block(id)}>Block</Button>)
        }
        else {
            return (<Button size="sm" isLoading={loading} color="primary" onClick={(e) => unBlock(id)}>UnBlock</Button>)
        }
    }

    const getFreshStatus = (validity:any) => <p>{validity == null ? 'Used' : 'Fresh' }</p>

    const getDate = (date: any) => {
        const dateObject = new Date(date);
        return (`${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()} & ${dateObject.getHours()}:${dateObject.getMinutes()}`)
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <Table layout="auto" aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>GENERATED KEY</TableColumn>
                <TableColumn>VALIDITY TILL </TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>Delete</TableColumn>
                <TableColumn>FRESH STATUS</TableColumn>
            </TableHeader>
            <TableBody isLoading={loading}>
                {datas.map((key: any) => (
                    <TableRow key={key?._id}>
                        <TableCell>{key?.key}</TableCell>
                        <TableCell>{getDate(key?.validity)}</TableCell>
                        <TableCell>{getDate(key?.createdAt)}</TableCell>
                        <TableCell>{getStatus(key?.isActive, key?._id)}</TableCell>
                        <TableCell><DeleteKey keys={key}/></TableCell>
                        <TableCell>{getFreshStatus(key?.period)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
