import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import toast from "react-hot-toast";
import { BiSolidShieldAlt2 } from "react-icons/bi";

export default function ProtectUser({user}:any){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const productUser = async () => {
        const response = await fetch('/api/users/protect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : user?._id,
                isLoginProtected : user?.isLoginProtected == 1 ? 0 : 1
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to protect the user')
          }
          else {
            toast.success('User protect successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content={user?.isLoginProtected == 1 ? 'Release User' : 'Secure User'}><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className={`text-lg text-${user?.isLoginProtected == 1 ? 'danger' : 'success'} bg-transparent cursor-pointer active:opacity-50`}><BiSolidShieldAlt2/></span></Button></Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{user?.isLoginProtected == 1 ? 'Release User' : 'Secure User'} {user?.username}</ModalHeader>
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