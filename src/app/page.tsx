"use client";
import { PiGameControllerFill } from "react-icons/pi";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";

export default function HomePage() {
  const [selected, setSelected] = useState("login");

  useEffect(()=>{
    window.history.pushState({}, '', '/');
  },[])
  if(1==1){
    return("Mooditu kalambu ellam mudinchu");
  }
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <div className="flex flex-row pb-4 space-x-3 items-center">
        <span className="rounded-lg text-xl">
          <PiGameControllerFill />
        </span>
        <h1 className="font-bold text-xl md:flex ">RX Cheat</h1>
      </div>
      <Card className="max-w-full w-[500px] login-card">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
          >
            <Tab key="login" title="Login">
              <LoginForm setSelected={setSelected}/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}