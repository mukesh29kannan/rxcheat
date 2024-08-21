import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import {useRouter} from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { DeleteIcon } from "./DeleteIcon";

export default function DeleteKeyComp({keys}:any){
    const router=useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [confirmText,setConfirmText] = useState('');
    const deleteKey = async () => {
        const response = await fetch('/api/key/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : keys?._id
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to delete the key')
          }
          else {
            toast.success('Key deleted successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content="Delete Key"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className="text-lg text-danger bg-transparent cursor-pointer active:opacity-50"><DeleteIcon/></span></Button></Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete {keys?.key}</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="key"
                                    placeholder="Enter new key"
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                />  
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" type="submit" isDisabled={ confirmText != 'gokul'} onClick={(e)=>{e.preventDefault(); deleteKey()}}>
                                    Delete
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