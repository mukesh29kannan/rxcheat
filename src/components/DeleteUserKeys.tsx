import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import { DeleteIcon } from "./DeleteIcon";
import { GiOverkill } from "react-icons/gi";

export default function DeleteUserKeys({keys}:any){
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const deleteKey = async () => {
        const response = await fetch('/api/users/delete-keys', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : keys?._id
            })
          });
      
          if (!response.ok) {
            toast.error('Unable to delete the keys')
          }
          else {
            toast.success('User keys deleted successfully')
            location.reload();
          }
    }
    return (
        <>
        <Tooltip content="Delete User keys"><Button isIconOnly className="bg-transparent" onPress={onOpen} ><span className="text-lg text-danger bg-transparent cursor-pointer active:opacity-50"><GiOverkill/></span></Button></Tooltip>
        <Modal isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange} >
            <ModalContent>
            {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete {keys?.name} Keys</ModalHeader>
                            <ModalBody>
                                <p>Are you sure want to delete the keys ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" type="submit" onClick={(e)=>{e.preventDefault(); deleteKey()}}>
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