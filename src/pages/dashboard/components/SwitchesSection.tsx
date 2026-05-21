import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import { putSwitchMode } from '@/api/switch';
import CardWithSwitch from './CardWithSwitch';
import CustomCard from './CustomCard';

export default function SwitchesSection() {
  return (
    <Flex justify="center" w="100vw">
      <SimpleGrid
        w='100%'
        m="xl"
        px="6rem"
        py="xl"
        cols={{ base: 1, sm: 2, lg: 3 }}
        // bg="var(--mantine-color-lime-2)"
        // style={{ borderRadius: 'var(--mantine-radius-md)' }}
        // bd="1px solid var(--mantine-color-lime-5)"
      >
        <Flex w="100%" justify="center">
          <CardWithSwitch title="led 1" switchId={1} />
        </Flex>
        <Flex w="100%" justify="center">
          <CardWithSwitch title="led 2" switchId={2} />
        </Flex>
        <Flex w="100%" justify="center">
          <CustomCard title="ESP connection" label="Chceck connection with device">
            {' '}
            <Flex w="100%" h="5rem" align="center" justify="center" px="xl" py="sm">
              <Button>Check connection</Button>
            </Flex>
          </CustomCard>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
