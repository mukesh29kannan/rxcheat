'use client'
import { 
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    Button, useDisclosure, Input, Select, SelectItem 
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiKeyFill } from "react-icons/pi";

export default function AddKeyComp() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [keyFields, setKeyFields] = useState({
        key: '',
        period: '',
        noDevices: '',
        game: 'PUBG'
    });
    const [errors, setErrors] = useState<any>({}); 

    const periods = [
        { value: 1, label: 'One Day' },
        { value: 2, label: 'Two Days' },
        { value: 3, label: 'Three Days' },
        { value: 7, label: 'Seven Days' },
        { value: 30, label: 'One Month' },
    ];

    const validateFields = () => {
        let newErrors:any = {};

        if (!/^[a-zA-Z0-9]{1,36}$/.test(keyFields.key)) 
            newErrors.key = "Key must be alphanumeric (1-36 characters)";

        if (!keyFields.period) 
            newErrors.period = "Please select a valid period";

        if (!keyFields.noDevices) 
            newErrors.noDevices = "Enter a valid number of devices (min: 1)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitKey = async () => {
        if (!validateFields()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await fetch('/api/key/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(keyFields)
            });

            if (!response.ok) {
                toast.error('Key already exists');
            } else {
                toast.success('Key created successfully');
                setKeyFields({ key: '', period: '', noDevices: '', game: 'PUBG' });
                onOpenChange();
            }
        } catch (error) {
            toast.error('Error creating key');
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" size="sm" variant="shadow" endContent={<PiKeyFill />}>
                Generate
            </Button>

            <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Generate New Key</ModalHeader>
                            <ModalBody>
                                {/* Key Input */}
                                <Input
                                    isRequired
                                    label="Key"
                                    placeholder="Enter new key"
                                    type="text"
                                    value={keyFields.key}
                                    onChange={(e) => setKeyFields({ ...keyFields, key: e.target.value })}
                                    isInvalid={!!errors.key}
                                    errorMessage={errors.key}
                                />

                                {/* Game Input */}
                                <Input
                                    isRequired
                                    label="Game"
                                    placeholder="Enter game name"
                                    type="text"
                                    value={keyFields.game}
                                    onChange={(e) => setKeyFields({ ...keyFields, game: e.target.value })}
                                />

                                {/* Select Time Period */}
                                <Select
                                    label="Time Period"
                                    placeholder="Select validity"
                                    selectedKeys={[keyFields.period]}
                                    onChange={(e) => setKeyFields({ ...keyFields, period: e.target.value })}
                                    isInvalid={!!errors.period}
                                    errorMessage={errors.period}
                                >
                                    {periods.map((period) => (
                                        <SelectItem key={period.value} value={period.value}>
                                            {period.label}
                                        </SelectItem>
                                    ))}
                                </Select>

                                {/* No. of Devices Input */}
                                <Input
                                    isRequired
                                    label="No Of Devices"
                                    placeholder="Enter the number of devices"
                                    type="number"
                                    min="1"
                                    max="1000000"
                                    value={keyFields.noDevices}
                                    onChange={(e) => setKeyFields({ ...keyFields, noDevices: e.target.value })}
                                    isInvalid={!!errors.noDevices}
                                    errorMessage={errors.noDevices}
                                />
                            </ModalBody>
                            
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" onClick={submitKey}>
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
