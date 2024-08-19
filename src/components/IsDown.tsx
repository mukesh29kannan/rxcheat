import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {getIsMaintainance} from '@/lib/actions';
import { FaScrewdriverWrench } from "react-icons/fa6";
import { SiGoogleearthengine } from "react-icons/si";

export default function IsDown(){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [downStatus,setDownStatus] = useState<any>({});
    const setMaintainance = async () => {
        const response = await fetch('/api/users/set-maintain', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : 1
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to set maintenance')
          }
          else {
            toast.success('Maintenance setted successfully')
            location.reload();
          }
    }

    const remMaintainance = async () => {
        const response = await fetch('/api/users/remove-maintain', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : 1
            })
          });
          if (!response.ok) {
            toast.error('Unable to remove maintenance')
          }
          else {
            toast.success('Maintenance removed successfully')
            location.reload();
          }
    }

    const getMaintainStatus = async () => {
        const response = await getIsMaintainance();
        setDownStatus(response)
    }
    useEffect(()=>{
        getMaintainStatus()
    },[])
    return (
        <>
        {downStatus.status == true && (downStatus.isDown == false ? <Tooltip content="set maintenance"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className="text-lg text-danger bg-transparent cursor-pointer active:opacity-50"><FaScrewdriverWrench/></span></Button></Tooltip> : <Tooltip content="remove maintenance"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className="text-lg text-success bg-transparent cursor-pointer active:opacity-50"><SiGoogleearthengine/></span></Button></Tooltip> )}
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Maintenance</ModalHeader>
                            <ModalBody>
                                <p>Are you sure want to {downStatus.isDown == false ? 'enable maintenance' : 'disable maintenance'}</p>
                            </ModalBody>
                            <ModalFooter>
                                {downStatus.isDown == false ? <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); setMaintainance()}}> Set Maintenance </Button> : <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); remMaintainance()}}> Remove Maintenance </Button> }
                                
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}