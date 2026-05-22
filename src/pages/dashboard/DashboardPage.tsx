import { HouseWifi } from 'lucide-react';
import { Box, Button, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import { putSwitchMode } from '@/api/switch';
import PUChart from './components/PUChart';
import SwitchesSection from './components/SwitchesSection';
import classes from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="var(--mantine-color-gray-1)"
        pt="0px"
        mt="0px"
        maw="100vw"
        style={{ overflowX: 'hidden' }}
        //className={classes.bg}
      >
        {/* <Flex w="100vw" ta="center" bg="red" justify="center"> */}
        <Stack
          h="70vh"
          w="100vw"
          p="xl"
          ta="center"
          my="lg"
          mt="0px"
          //mx="10vw"
          justify="center"
          align="center"
          //bg="var(--mantine-color-lime-7)"
          pos="fixed"
          className={classes.bg}
          style={{
            //borderRadius: 'var(--mantine-radius-md)',
            //background: `linear-gradient(to bottom,var(--mantine-color-lime-9), var(--mantine-color-lime-7), var(--mantine-color-lime-6),  var(--mantine-color-lime-2)`,
            zIndex: 1,
          }}
          // bd="1px solid var(--mantine-color-lime-5)"
        >
          <Flex justify="center" w="100%">
            {/* <HouseWifi
              color="#ffffff"
              size={68}
              strokeWidth={2.5}
              style={{ marginTop: '10px', marginRight: ' 15px' }}
            /> */}

            <Title c="white" fz="4rem" mr="0px">
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
          <Box mt="-50px">
            <SwitchesSection />
          </Box>
          <Box
            bg="var(--mantine-color-gray-1)"
            pt="10rem"
            mt="-20vh"
            style={{ borderTop: '2px solid var(--mantine-color-gray-3)' }}
          >
            {/* <Divider my="xl" mx="5rem" size="sm" label="Charts" /> */}
            <PUChart />
          </Box>
        </Box>
      </Box>
    </>
  );
}
