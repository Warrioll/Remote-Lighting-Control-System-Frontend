import { Dispatch,  SetStateAction , useState } from "react"
import CustomCard from "./CustomCard"
import { Switch, Flex } from "@mantine/core"
import toast from "react-hot-toast"
import { putSwitchMode } from "@/api/switch"
import { Lightbulb, LightbulbOff } from "lucide-react"

type CardWithSwitchProps = {
    title: string
     switchId: number
}

export default function CardWithSwitch({title,   switchId}:CardWithSwitchProps){
    const [checked, setChecked] = useState<boolean| undefined>(undefined);


    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>)=>{
     const switchState=event.currentTarget.checked

         toast.promise(  putSwitchMode(switchId,  switchState ? 'ON' : 'OFF'),
      {
        loading:  switchState ? `Turning on LED ${switchId}...` :  `Turning off LED ${switchId}...`,
        success:  switchState ? <b>LED {switchId} turned on!</b> :  <b>LED {switchId} turned off!</b>,
        error:   ()=>{
            setChecked(!switchState)
            return switchState ? <b>Could not turn on LED {switchId}</b> :  <b>Could not turn on LED {switchId}</b>

        }
      },{
        success: {icon: switchState ? <Lightbulb size={24} color="#fcc419" strokeWidth={3} /> : <LightbulbOff size={24} color="var(--mantine-color-dark-2)" strokeWidth={2.75} />}
      }
      
    )
     
    
      
    
}

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