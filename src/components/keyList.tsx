'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function KeyList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch('/api/key/list', {
                method: 'GET'
            });
            const data = await response.json();
            setData(data.data)
        } catch (err) {
            toast.error('Something went wrong')

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
            return (<Button size='sm' color="danger" onClick={(e) => block(id)}>Block</Button>)
        }
        else {
            return (<Button size="sm" color="primary" onClick={(e) => unBlock(id)}>UnBlock</Button>)
        }
    }
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
            </TableHeader>
            <TableBody>
                {data.map((key: any) => (
                    <TableRow key={key?._id}>
                        <TableCell>{key?.key}</TableCell>
                        <TableCell>{getDate(key?.validity)}</TableCell>
                        <TableCell>{getDate(key?.createdAt)}</TableCell>
                        <TableCell>{getStatus(key?.isActive, key?._id)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
