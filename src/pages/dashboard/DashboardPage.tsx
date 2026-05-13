import { Box, Button } from '@mantine/core';
import { putSwitchMode } from '@/api/switch';


export default function DashboardPage() {
  return (
    <>
      Dashboard Page
      <Box>
        <Button
          onClick={() => {
            putSwitchMode(1, 'OFF');
          }}
        >
          Off
        </Button>
        <Button
          onClick={() => {
            putSwitchMode(1, 'ON');
          }}
        >
          On
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => {
            putSwitchMode(2, 'OFF');
          }}
        >
          Off
        </Button>
        <Button
          onClick={() => {
            putSwitchMode(2, 'ON');
          }}
        >
          On
        </Button>
      </Box>
    </>
  );
}
