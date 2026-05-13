import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { logIn } from '@/api/auth';
import classes from './LoginPage.module.css';

export default function LoginPage() {
  const [data, setData] = useState<{ username: string; pass: string }>({ username: '', pass: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      await logIn(data.username, data.pass);
      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.bg}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome!
        </Title>

        <Text className={classes.subtitle}>This is private IoT dashboard project.</Text>

        <Paper withBorder shadow="lg" p={22} mt={30} radius="md">
          <TextInput
            value={data.username}
            onChange={(event) => setData({ ...data, username: event.currentTarget.value })}
            variant="filled"
            label="Username"
            placeholder="Enter username"
            required
          />
          <PasswordInput
            value={data.pass}
            onChange={(event) => setData({ ...data, pass: event.currentTarget.value })}
            variant="filled"
            label="Password"
            placeholder="Enter password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl" onClick={login}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
