import { Box, Button, Divider, Flex, Title } from '@mantine/core';
import { putSwitchMode } from '@/api/switch';
import PUChart from './components/PUChart';
import SwitchesSection from './components/SwitchesSection';
import classes from '../login/LoginPage.module.css';

export default function DashboardPage() {
  return (
    <Box
      w="100%"
      h="100%"
      bg="var(--mantine-color-gray-1)"
      pt="xl"
      maw="100vw"
      style={{ overflowX: 'hidden' }}
      className={classes.bg}
    >
      <Flex
        w="100vw"
        p="lg"
        ta="center"
        my="lg"
        justify="center"
        // bg="var(--mantine-color-lime-2)"
        // style={{ borderRadius: 'var(--mantine-radius-md)' }}
        // bd="1px solid var(--mantine-color-lime-5)"
      >
        <Title c='var(--mantine-color-lime-8'>Welcome to your dashboard!</Title>
      </Flex>

      <SwitchesSection />
      <Divider my="lg" mx="5rem" size="sm" />
      <PUChart />
    </Box>
  );
}
