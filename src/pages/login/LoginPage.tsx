import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
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
  const [blocked, setBlocked] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      toast.promise(logIn(data.username, data.pass), {
        loading: 'Authentication...',
        success: () => {
          setBlocked(false);
          navigate('dashboard');
          return <b>Logged in succesfully!</b>;
        },
        error: (err) => {
          const status = err?.response?.status;
          setBlocked(false);
          if (status === 401) {
            return <b>Username or password is incorrect!</b>;
          }
          return <b>Could not login.</b>;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.bg}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title} c="white" fw="bold">
          Welcome!
        </Title>

        <Text className={classes.subtitle} c="white">
          This is private IoT dashboard project.
        </Text>

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
          <Button
            fullWidth
            mt="xl"
            onClick={() => {
              setBlocked(true);
              login();
            }}
            disabled={blocked}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
