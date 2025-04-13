import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import toast from "react-hot-toast";
import { MdLockReset } from "react-icons/md";

export default function ResetProtect({user}:any){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const productUser = async () => {
        const response = await fetch('/api/users/reset-protect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : user?._id
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to reset protect the user')
          }
          else {
            toast.success('User reset protect successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content="Reset Product"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className={`text-lg text-warning bg-transparent cursor-pointer active:opacity-50`}><MdLockReset/></span></Button></Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reset Protect {user?.username}</ModalHeader>
                            <ModalFooter>
                                <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); productUser()}}>
                                    Yes
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