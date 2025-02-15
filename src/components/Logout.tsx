import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";

export default function Logout({id}:any){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const logoutUser = async () => {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : id
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to log the user')
          }
          else {
            toast.success('User logged out successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content="Delete User">
            <Button isIconOnly className="bg-transparent" onPress={onOpen} >
                <span className="text-lg text-danger bg-transparent cursor-pointer active:opacity-50">
                    <IoMdLogOut/>
                </span>
            </Button>
        </Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Logout User</ModalHeader>
                            <ModalBody>
                                Are you sure ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); logoutUser()}}>
                                    Logout
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