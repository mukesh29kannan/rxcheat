'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PiKeyFill } from "react-icons/pi";

export default function AddKeyComp() {
    const router=useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [keyFields, setKeyFields] = useState({
        key: '',
        period: '',
        noDevices: "",
        game:"PUBG"
    });
    const periods = [
        { value: 1, label: 'One Day' },
        { value: 2, label: 'Two Day' },
        { value: 3, label: 'Three Day' },
        { value: 7, label: 'Seven Day' },
        { value: 30, label: 'One Month Day' },

    ]
    
    const submitKey = async () => {
        if(keyFields.key.length && keyFields.period.length && keyFields.noDevices.length && keyFields.game.length){
            const response = await fetch('/api/key/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(keyFields)
              });
              if (!response.ok) {
                toast.error('Key already exists')
              }
              else {
                toast.success('Key created successfully')
              }
              location.reload();
        }
        else{
            toast.error('Unable to create key')
        }
        onOpenChange()
   }

    return (
        <>
            <Button onPress={onOpen} color="primary" size="sm" variant="shadow" endContent={<PiKeyFill/>}>Generate</Button>
            <Modal
                isOpen={isOpen}
                placement={'auto'}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Generate New Key</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="key"
                                    placeholder="Enter new key"
                                    type="text"
                                    value={keyFields.key}
                                    onChange={(e) => setKeyFields({ ...keyFields, key: e.target.value })}
                                />
                                <Input
                                    isRequired
                                    label="game"
                                    placeholder="Enter game"
                                    type="text"
                                    value={keyFields.game}
                                    onChange={(e) => setKeyFields({ ...keyFields, game: e.target.value })}
                                />
                                <Select
                                    label="Time Period"
                                    placeholder="Select an validity"
                                    className="max-w"
                                    onChange={(e)=>setKeyFields({...keyFields,period:e.target.value})}
                                >
                                    {periods.map((period) => (
                                        <SelectItem key={period.value} value={period.value}>
                                            {period.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    isRequired
                                    label="No Of Devices"
                                    placeholder="Enter the No of devices"
                                    type="number"
                                    min="0" 
                                    max="1000000"
                                    value={keyFields.noDevices}
                                    onChange={(e) => setKeyFields({ ...keyFields, noDevices: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" onClick={(e)=>{e.preventDefault(); submitKey()}}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
