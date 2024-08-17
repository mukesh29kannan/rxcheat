"use client"
import { handleLogin } from "@/lib/actions";
import { Tabs, Tab, Input, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
export default function Home() {
  const router = useRouter();
  const [loginFields, setLoginFileds] = useState({
    username: '',
    password: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitLogin = async () => {
    if (loginFields.password.length && loginFields.username.length) {
      toast.success("Wait pannu papom 🤔")
      try {
        setLoading(true)
          await handleLogin(loginFields) 
          router.push('/dashboard')
      }
      catch (err) {
        toast.error("😁 Unable to login")
      }finally{
        setLoading(false)
      }
    }
    else {
      toast.error("😁 please enter all the required fields")
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
              selectedKey={"login"}
            >
              <Tab key="login" title="Login">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Username"
                    placeholder="Enter your user name"
                    type="text"
                    value={loginFields.username}
                    onChange={(e) => setLoginFileds({ ...loginFields, username: e.target.value })}
                    isInvalid={!(loginFields.username.length)}
                  />

                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    value={loginFields.password}
                    onChange={(e) => setLoginFileds({ ...loginFields, password: e.target.value })}
                    isInvalid={!(loginFields.password.length)}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" isLoading={loading} type="submit" onClick={(e: any) => { e.preventDefault(); submitLogin() }}>
                      Login
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

