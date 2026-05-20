import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { AreaChart } from '@mantine/charts';
import { Box, Button, Flex, Input, Paper, Stack } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { getPowerUsageData } from '@/api/powerUsage';

export const data = [
  {
    date: 'Martttttttttttttttttttttttttmcyliv 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];

export default function PUChart() {
  const fromDateToPickerFormatter = new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Warsaw',
  });

  const [puData, setPuData] = useState<{ value: number; time: string }[]>([]);
  const [fromDate, setFromDate] = useState<string>(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('sv-SE')
  );
  // console.log(
  //   fromDateToPickerFormatter.format(new Date(Date.now() - 24 * 60 * 60 * 1000)).replace(',', '')
  // );
  const [toDate, setToDate] = useState<string>(new Date(Date.now()).toLocaleString('sv-SE'));

  const getDataForChart = async () => {
    toast.promise(
      async () => {
        console.log(fromDate);
        console.log(toDate);
        const data = await getPowerUsageData(
          // new Date(Date.now() - 168 * 60 * 60 * 1000),
          // new Date(Date.now())

          new Date(fromDate.replace(' ', 'T')),
          new Date(toDate.replace(' ', 'T'))
        );
        setPuData(data);
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

  const datePresets = [
    { value: new Date(Date.now()).toLocaleString('sv-SE'), label: 'Today' },
    {
      value: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('sv-SE'),
      label: 'Yesterday',
    },
    {
      value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString('sv-SE'),
      label: 'Last week',
    },
    {
      value: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('sv-SE'),
      label: 'Last month',
    },
    {
      value: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleString('sv-SE'),
      label: 'Last year',
    },
  ];

  return (
    <Paper maw="100vw" mx="5rem" m="0px" mb="xl" withBorder>
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
                onChange={setFromDate}
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
                onChange={setToDate}
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
            onChange={setFromDate}
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
            onChange={setToDate}
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
            <AreaChart
              h={300}
              data={puData}
              dataKey="time"
              series={[{ name: 'value', color: 'lime.6' }]}
              xAxisProps={{ interval: 'preserveStartEnd', minTickGap: 35 }}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              yAxisProps={{ domain: [2800, 3300] }}
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
  );
}
