"use client"
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import {  useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const [signinFields, setSignFileds] = useState<any>({
    name: '',
    username: '',
    password: '',
    key: '',
    location:''
  });

  const submitSignIn = async () => {
    Object.keys(signinFields).map((field:string ) => {
      if (signinFields[field]?.length < 3)
        toast.error(`Please enter the valid ${field}`);
    })
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signinFields)
    });

    if (!response.ok) {
      toast.error('Unable to create user')
    }
    else {
      toast.success('User created successfully')
      router.refresh();
    }
  }
  return (
    <>
    <div className="flex justify-center items-center py-2" >
        <h1 className="text-3xl font-bold">RX Cheat</h1>
      </div>
    <div className="flex justify-center items-center">
      
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[550px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={"sign-up"}
            >
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px]">
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    value={signinFields.name}
                    onChange={(e) => setSignFileds({ ...signinFields, name: e.target.value })}
                    isInvalid={!(signinFields.name.length)}
                  />
                  <Input
                    isRequired
                    label="Username"
                    placeholder="Enter your user name"
                    type="text"
                    value={signinFields.username}
                    onChange={(e) => setSignFileds({ ...signinFields, username: e.target.value })}
                    isInvalid={!(signinFields.username.length)}
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={signinFields.password}
                    onChange={(e) => setSignFileds({ ...signinFields, password: e.target.value })}
                    isInvalid={!(signinFields.password.length)}
                  />
                  <Input
                    isRequired
                    label="Key"
                    placeholder="Enter your key"
                    type="password"
                    value={signinFields.key}
                    onChange={(e) => setSignFileds({ ...signinFields, key: e.target.value })}
                    isInvalid={!(signinFields.key.length)}
                  />
                  <Input
                    isRequired
                    label="Location"
                    placeholder="Enter your location"
                    type="text"
                    value={signinFields.location}
                    onChange={(e) => setSignFileds({ ...signinFields, location: e.target.value })}
                    isInvalid={!(signinFields.location.length)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" isDisabled={signinFields.location != 'gokul'} type="submit" onClick={(e) => { e.preventDefault(); submitSignIn() }}>
                      Sign up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div >
    </>
  );
}