import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import { BiReset } from "react-icons/bi";

export default function ResetDevices({keys}:any){
    const router=useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const resetDevice = async () => {
        const response = await fetch('/api/key/reset-devices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : keys?._id
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to reset the devices')
          }
          else {
            toast.success('devices reseted successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content="Reset devices"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className="text-lg text-primary bg-transparent cursor-pointer active:opacity-50"><BiReset/></span></Button></Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reset Devices for {keys?.key}</ModalHeader>
                            <ModalBody>
                                <p>Are you Sure want to reset? </p> 
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); resetDevice()}}>
                                    Reset
                                </Button>
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