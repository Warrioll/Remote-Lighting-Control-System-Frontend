import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { AreaChart } from '@mantine/charts';
import { Box, Button, Flex, Input, Paper, Stack, Title, ScrollArea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { getPowerUsageData } from '@/api/powerUsage';

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
const midnight = tomorrow.setHours(0, 0, 0, 0);

const datePresets = [
  // {
  //   value: new Date(midnight).toLocaleString('sv-SE'),
  //   label: 'Midnight',
  // },
  {
    value: new Date(Date.now()).toLocaleString('sv-SE'),
    label: 'Now',
  },

  {
    value: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('sv-SE'),
    label: '24h ago',
  },
  {
    value: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleString('sv-SE'),
    label: '48h ago',
  },
  {
    value: new Date(Date.now() - 72 * 60 * 60 * 1000).toLocaleString('sv-SE'),
    label: '72h ago',
  },
  {
    value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString('sv-SE'),
    label: 'Last week',
  },
  {
    value: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('sv-SE'),
    label: 'Last month',
  },
  // {
  //   value: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleString('sv-SE'),
  //   label: 'Last year',
  // },
];

export default function PUChart() {
  // const fromDateToPickerFormatter = new Intl.DateTimeFormat('pl-PL', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  //   timeZone: 'Europe/Warsaw',
  // });

  const [puData, setPuData] = useState<{ value: number; time: string }[]>([]);

  const [fromDate, setFromDate] = useState<string>(
    new Date(midnight - 24 * 60 * 60 * 1000).toLocaleString('sv-SE')
  );
  // console.log(
  //   fromDateToPickerFormatter.format(new Date(Date.now() - 24 * 60 * 60 * 1000)).replace(',', '')
  // );
  const [toDate, setToDate] = useState<string>(new Date(midnight).toLocaleString('sv-SE'));

  const getDataForChart = async () => {
    toast.promise(
      async () => {
        const data = await getPowerUsageData(
          // new Date(Date.now() - 168 * 60 * 60 * 1000),
          // new Date(Date.now())

          new Date(fromDate.replace(' ', 'T')),
          new Date(toDate.replace(' ', 'T'))
        );
        setPuData(data);
        // console.log('data: ', data);
      },
      {
        loading: `loading data...`,
        success: <b>Data loaded succesfully!</b>,
        error: () => {
          return <b>Could not data</b>;
        },
      }
    );
  };

  useEffect(() => {
    const setDevise = async () => {
      try {
        const data = await getPowerUsageData(
          new Date(fromDate.replace(' ', 'T')),
          new Date(toDate.replace(' ', 'T'))
        );
        setPuData(data);
      } catch (error) {
        console.log(error);
      }
    };

    setDevise();
  }, []);

  return (<>
    <Paper maw="100vw" visibleFrom='sm' mx='5rem' m="0px" mb="xl" withBorder>
      <Box //Paper
        mx={{ sm: '7rem', base: 'xs' }}
        my="xl"
        //px="5rem"
        // mb="md"
        // withBorder
        // p="md"
        // bg="var(--mantine-color-lime-4)"
      >
        <Flex visibleFrom="sm" justify="space-between" align="center">
          <Flex>
            <Flex align="center" mx="lg">
              <Input.Label mr="sm">From</Input.Label>
              <DateTimePicker
                w="12rem"
                variant="filled"
                withSeconds
                placeholder="Pick start date"
                value={fromDate}
                onDateChange={setFromDate}
                onChange={(value) => {
                  setFromDate(value as string);
                }}
                valueFormat="DD MMM YYYY hh:mm:ss"
                presets={datePresets}
              />
            </Flex>
            <Flex align="center" mx="lg">
              <Input.Label mr="sm">To</Input.Label>{' '}
              <DateTimePicker
                w="12rem"
                variant="filled"
                withSeconds
                placeholder="Pick end date"
                value={toDate}
                onDateChange={setToDate}
                onChange={(value: string | null) => {
                  setToDate(value as string);
                }}
                valueFormat="DD MMM YYYY hh:mm:ss"
                presets={datePresets}
              />
            </Flex>
          </Flex>

          <Button
            onClick={getDataForChart}
            leftSection={<RefreshCw color="white" size={18} strokeWidth={2.75} />}
          >
            Load
          </Button>
        </Flex>

        <Stack hiddenFrom="sm" justify="space-between" align="center">
          <DateTimePicker
            w="12rem"
            variant="filled"
            withSeconds
            placeholder="Pick start date"
            value={fromDate}
            onDateChange={setFromDate}
            onChange={(value) => {
              setFromDate(value as string);
            }}
            valueFormat="DD MMM YYYY hh:mm:ss"
            presets={datePresets}
            label="From"
          />
          <DateTimePicker
            label="To"
            w="12rem"
            variant="filled"
            withSeconds
            placeholder="Pick end date"
            value={toDate}
            onDateChange={setToDate}
            onChange={(value) => {
              setToDate(value as string);
            }}
            valueFormat="DD MMM YYYY hh:mm:ss"
            presets={datePresets}
          />

          <Button
            fullWidth
            variant="light"
            onClick={getDataForChart}
            leftSection={
              <RefreshCw color="var(--mantine-color-lime-6)" size={18} strokeWidth={2.75} />
            }
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      <Box m="xl" px="xl" pt="md" maw="100vw">
        {puData.length > 0 ? (
          <Box pr="4rem">
            <Flex justify="center" my="md" mt="6rem">
              <Title fz="1.5rem" c="dimmed">
                Current
              </Title>
            </Flex>
            <AreaChart
              h={300}
              data={puData}
              dataKey="time"
              series={[{ name: 'current', color: 'lime.6' }]}
              xAxisProps={{ interval: 'preserveStartEnd', minTickGap: 35 }}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              unit="A"
              yAxisProps={{ domain: [0.02, 0.03] }}
            />
            <Flex justify="center" my="md" mt="6rem">
              <Title fz="1.5rem" c="dimmed">
                Raw value
              </Title>
            </Flex>
            <AreaChart
              h={300}
              data={puData}
              dataKey="time"
              series={[{ name: 'value', color: 'red.6' }]}
              xAxisProps={{ interval: 'preserveStartEnd', minTickGap: 35 }}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              yAxisProps={{ domain: [1400, 1600] }}
            />
          </Box>
        ) : (
          <Flex
            justify="center"
            align="center"
            c="dimmed"
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            bd=" 2px solid var(--mantine-color-gray-3)"
            h={300}
            mx="xl"
          >
            <b>No data recorded in the selected time period </b>
          </Flex>
        )}
      </Box>
    </Paper>

        <Paper maw="100vw" hiddenFrom='sm' mx='0rem' m="0px" mb="xl"  radius='0px' withBorder>
      <Box //Paper
        mx={{ sm: '7rem', base: 'xs' }}
        my="xl"
        //px="5rem"
        // mb="md"
        // withBorder
        // p="md"
        // bg="var(--mantine-color-lime-4)"
      >
        <Flex visibleFrom="sm" justify="space-between" align="center">
          <Flex>
            <Flex align="center" mx="lg">
              <Input.Label mr="sm">From</Input.Label>
              <DateTimePicker
                w="12rem"
                variant="filled"
                withSeconds
                placeholder="Pick start date"
                value={fromDate}
                onDateChange={setFromDate}
                onChange={(value) => {
                  setFromDate(value as string);
                }}
                valueFormat="DD MMM YYYY hh:mm:ss"
                presets={datePresets}
              />
            </Flex>
            <Flex align="center" mx="lg">
              <Input.Label mr="sm">To</Input.Label>{' '}
              <DateTimePicker
                w="12rem"
                variant="filled"
                withSeconds
                placeholder="Pick end date"
                value={toDate}
                onDateChange={setToDate}
                onChange={(value: string | null) => {
                  setToDate(value as string);
                }}
                valueFormat="DD MMM YYYY hh:mm:ss"
                presets={datePresets}
              />
            </Flex>
          </Flex>

          <Button
            onClick={getDataForChart}
            leftSection={<RefreshCw color="white" size={18} strokeWidth={2.75} />}
        
          >
            Load
          </Button>
        </Flex>

        <Stack hiddenFrom="sm" justify="space-between" align="center" px='10%'>
          <DateTimePicker
            dropdownType='modal'
            w="100%"
            variant="filled"
            withSeconds
            placeholder="Pick start date"
            value={fromDate}
            onDateChange={setFromDate}
            onChange={(value) => {
              setFromDate(value as string);
            }}
            valueFormat="DD MMM YYYY hh:mm:ss"
            presets={datePresets}
            label="From"
          />
          <DateTimePicker
           dropdownType='modal'
            label="To"
            w="100%"
            variant="filled"
            withSeconds
            placeholder="Pick end date"
            value={toDate}
            onDateChange={setToDate}
            onChange={(value) => {
              setToDate(value as string);
            }}
            valueFormat="DD MMM YYYY hh:mm:ss"
            presets={datePresets}
          />

          <Button
            w="100%"
            variant="light"
            onClick={getDataForChart}
            leftSection={
              <RefreshCw color="var(--mantine-color-lime-6)" size={18} strokeWidth={2.75} />
            }
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      <Box m="0px" px="0px" pt="md" maw="100vw">
       
        {puData.length > 0 ? (
          <Box >
            <Flex justify="center" my="md" mt="6rem">
              <Title fz="1.5rem" c="dimmed">
                Current
              </Title>
            </Flex>
            <ScrollArea>
            <AreaChart
             miw='50rem'
              h={300}
              mx='10px'
              data={puData}
              dataKey="time"
              series={[{ name: 'current', color: 'lime.6' }]}
              xAxisProps={{ interval: 'preserveStartEnd', minTickGap: 35 }}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              unit="A"
              yAxisProps={{ domain: [0.02, 0.03] }}
            />
  </ScrollArea>
            
            <Flex justify="center" my="md" mt="6rem">
              <Title fz="1.5rem" c="dimmed">
                Raw value
              </Title>
            </Flex>
            <ScrollArea>
            <AreaChart
            mx='10px'
            mb='3rem'
             miw='50rem'
              h={300}
              data={puData}
              dataKey="time"
              series={[{ name: 'value', color: 'red.6' }]}
              xAxisProps={{ interval: 'preserveStartEnd', minTickGap: 35 }}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              yAxisProps={{ domain: [1400, 1600] }}
            />
            </ScrollArea>
          </Box>
        ) : (
          <Flex
            justify="center"
            align="center"
            c="dimmed"
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            bd=" 2px solid var(--mantine-color-gray-3)"
            h={300}
            mx="xl"
            ta='center'
          >
            <b>No data recorded in the selected time period </b>
          </Flex>
        )}
      </Box>
    </Paper>
    </>
  );
}
