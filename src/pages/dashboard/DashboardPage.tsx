import { HouseWifi } from 'lucide-react';
import { Box, Button, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import { putSwitchMode } from '@/api/switch';
import PUChart from './components/PUChart';
import SwitchesSection from './components/SwitchesSection';
import classes from './DashboardPage.module.css';
import { io,Socket  } from 'socket.io-client';
import { useEffect, useState } from 'react';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { DeviceStateProvider } from '@/DeviceStateContextProvider';


const BACKENDURL = import.meta.env.VITE_BACKEND_URL as string


export default function DashboardPage() {

  return (
    <DeviceStateProvider>
      <Box
        w="100%"
        h="100%"
        bg="var(--mantine-color-gray-1)"
        pt="0px"
        mt="0px"
        maw="100vw"
        style={{ overflowX: 'hidden' }}
       
      >
       
        <Stack
          h="70vh"
          w="100vw"
          p="xl"
          ta="center"
          my="lg"
          mt="0px"
        
          justify="center"
          align="center"
       
          pos="fixed"
          className={classes.bg}
          style={{
          
            zIndex: 1,
          }}
    
        >
          <Flex justify="center" w="100%">
            <Title c="white" fz={{sm: "4rem", base: '2rem', xxl:'7rem'}} mr="0px">
              Welcome to your IoT dashboard!
            </Title>
          </Flex>

          <Title c="white" fw="normal" fz="xl" mb="20vh" mt="sm">
            Manage and Monitor Your Device
          </Title>
        </Stack>
        {/* </Flex> */}
        <Box style={{ zIndex: 10 }} pos="relative" mt="48vh">
          {/* <Divider
            my="lg"
            size="sm"
            mt="-50px"
            mx="22rem"
            label={
              <Text c="white" fz="xs">
                Controls
              </Text>
            }
            color="white"
          /> */}
          <Box mt={{md:"-50px", base: '-8rem'}}>
            <SwitchesSection />
          </Box>
          <Box
            bg="var(--mantine-color-gray-1)"
            pt={{base: '28rem',md:"13rem"}}
            mt={{base: "-55vh", md: '-20vh', xxl: '-10vh'}}
            style={{ borderTop: '2px solid var(--mantine-color-gray-3)' }}
          >
            {/* <Divider my="xl" mx="5rem" size="sm" label="Charts" /> */}
            <PUChart />
          </Box>
        </Box>
      </Box>
    </DeviceStateProvider>
  );
}
