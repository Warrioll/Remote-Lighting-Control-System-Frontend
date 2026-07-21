import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, Button, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { getDeviceStatus } from '@/api/deviceStatus';
import { putSwitchMode } from '@/api/switch';
import CardWithSwitch from './CardWithSwitch';
import CustomCard from './CustomCard';
import { Socket  } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { useDeviceState } from '@/DeviceStateContextProvider';

type SwitchesSectionProps={
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

export default function SwitchesSection(//{socket}: SwitchesSectionProps

) {
  const [deviceStatus, setDeviceStatus] = useState<{
    isConnected: boolean;
    sitch1status: boolean;
    switch2status: boolean;
  } | null>(null);


  
    const { isConnected, setIsConnected, socket } = useDeviceState()

  // const getEsp32Status = async () => {
  //   try {
  //     toast.promise(
  //       async () => {
  //         const data = await getDeviceStatus();
  //         setDeviceStatus({ ...data });
  //         // if (deviceStatus?.isConnected) {
  //         //   toast.success(() => <b>Device is connected!</b>);
  //         // } else {
  //         //   toast.error(() => <b>Device is not connected!</b>);
  //         // }
  //       },
  //       {
  //         loading: 'Checking connection to device...',
  //         success: <b>Device check done</b>,
  //         error: <b>Could not check device status</b>,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  return (
    <Flex justify="center" w="100vw">
      <SimpleGrid w="100%" m="xl" px="6rem" py="xl" cols={{ base: 1, md: 2, lg: 3 }}>

        <Flex w="100%" justify="center">
          <CustomCard title="Device" label="Chceck connection with device">
            <Stack
              w="100%"
              h="6.5rem"
              align="center"
              justify="center"
              px="xl"
              pt="0.5rem"
              pb="xs"
              gap="0px"
            >
              {isConnected ? (
                <Badge color="green" w="9rem" h="2rem" size='lg'>
                  CONNECTED
                </Badge>
              ) : (
                <Badge color="red" w="9rem" h="2rem" size='lg'>
                  DISCONNECTED
                </Badge>
              )}
            </Stack>
          </CustomCard>
        </Flex>
                <Flex w="100%" justify="center">
          <CardWithSwitch title="led 1" switchId={1} //socket={socket} 
          />
        </Flex>
        <Flex w="100%" justify="center">
          <CardWithSwitch title="led 2" switchId={2} //socket={socket} 
          />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
