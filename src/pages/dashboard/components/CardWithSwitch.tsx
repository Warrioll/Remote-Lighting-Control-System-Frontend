import { Dispatch,  SetStateAction , useEffect, useState } from "react"
import CustomCard from "./CustomCard"
import { Switch, Flex } from "@mantine/core"
import toast from "react-hot-toast"
import { putSwitchMode } from "@/api/switch"
import { Lightbulb, LightbulbOff } from "lucide-react"
import { Socket  } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { useDeviceState } from "@/DeviceStateContextProvider"

type CardWithSwitchProps = {
    title: string
     switchId: number
      //socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}


export default function CardWithSwitch({title,   switchId}:CardWithSwitchProps){
    const [checked, setChecked] = useState<boolean| undefined>(undefined);




    const { switches, setSwitches, socket } = useDeviceState()

    const handleToggleWithSocket = (switchState:boolean)=>{
           return new Promise((resolve, reject) => {
            socket?.emit(
            'switch-toggle',
            { switchId, switchState },
            (response: { success: boolean; errorMsg: string }) => {
                if (!response.success) {
                reject(new Error(response.errorMsg));
                } else {
                resolve(null); 
                }
            }
            );
        });
    }

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>)=>{
     const switchState=event.currentTarget.checked

         toast.promise(  ()=>{
             return new Promise((resolve, reject) => {
            socket?.emit(
            'switch-toggle',
            { switchId, switchState },
            (response: { success: boolean; errorMsg: string }) => {
                if (!response.success) {
                reject(new Error(response.errorMsg));
                } else {
                resolve(null); 
                }
            }
            );
        });},
      {
        loading:  switchState ? `Turning on LED ${switchId}...` :  `Turning off LED ${switchId}...`,
        success:  switchState ? <b>LED {switchId} turned on!</b> :  <b>LED {switchId} turned off!</b>,
        error:   ()=>{
            setChecked(!switchState)
            return switchState ? <b>Could not turn on LED {switchId}</b> :  <b>Could not turn off LED {switchId}</b>

        }
      },{
        success: {icon: switchState ? <Lightbulb size={24} color="#fcc419" strokeWidth={3} /> : <LightbulbOff size={24} color="var(--mantine-color-dark-2)" strokeWidth={2.75} />}
      }
      
    )   
}

    useEffect(()=>{
        setChecked(switches[switchId-1])
    },[switches])

    return (<CustomCard  title={title}>
        <Flex w='100%' justify='center' p='xl'>
                        <Switch
              
              onLabel="ON" offLabel="OFF"
              size="xl"
               checked={checked}
            onChange={(event) => {setChecked(event.currentTarget.checked); handleToggle(event)}}
            /></Flex>

    </CustomCard>)
}