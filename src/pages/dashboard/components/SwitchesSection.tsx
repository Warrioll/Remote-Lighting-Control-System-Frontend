import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, Button, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { getDeviceStatus } from '@/api/deviceStatus';
import { putSwitchMode } from '@/api/switch';
import CardWithSwitch from './CardWithSwitch';
import CustomCard from './CustomCard';

export default function SwitchesSection() {
  const [deviceStatus, setDeviceStatus] = useState<{
    isConnected: boolean;
    sitch1status: boolean;
    switch2status: boolean;
  } | null>(null);

  const getEsp32Status = async () => {
    try {
      toast.promise(
        async () => {
          const data = await getDeviceStatus();
          setDeviceStatus({ ...data });
        },
        {
          loading: 'Checking connection to device...',
          success: <b>Device check done</b>,
          error: <b>Could not check device status</b>,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setDevise = async () => {
      try {
        const data = await getDeviceStatus();
        setDeviceStatus({ ...data });
      } catch (error) {
        console.log(error);
      }
    };

    setDevise();
  }, []);

  return (
    <Flex justify="center" w="100vw">
      <SimpleGrid w="100%" m="xl" px="6rem" py="xl" cols={{ base: 1, sm: 2, lg: 3 }}>
        <Flex w="100%" justify="center">
          <CardWithSwitch title="led 1" switchId={1} />
        </Flex>
        <Flex w="100%" justify="center">
          <CardWithSwitch title="led 2" switchId={2} />
        </Flex>
        <Flex w="100%" justify="center">
          <CustomCard title="Device" label="Chceck connection with device">
            <Stack
              w="100%"
              h="6.5rem"
              align="center"
              justify="center"
              px="xl"
              pt="1.3rem"
              pb="xs"
              gap="0px"
            >
              {deviceStatus?.isConnected ? (
                <Badge color="green" w="8rem" h="1.5rem">
                  CONNECTED
                </Badge>
              ) : (
                <Badge color="red" w="8rem" h="1.5rem">
                  DISCONNECTED
                </Badge>
              )}
              <Button
                m="xs"
                mt="10px"
                leftSection={<RefreshCw size={14} strokeWidth={2.75} />}
                size="xs"
                p="0.5rem"
                py="0px"
                variant="transparent"
                onClick={getEsp32Status}
              >
                Check connection
              </Button>
            </Stack>
          </CustomCard>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
