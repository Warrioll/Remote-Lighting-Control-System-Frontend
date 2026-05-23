import { useNavigate } from 'react-router-dom';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import Illustration from './components/Ilustration';
import classes from './NotFound.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title} fw="bold" c="var(--mantine-color-gray-9)">
            You have found a secret place.
          </Title>
          <Text
            c="var(--mantine-color-gray-7)"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Unfortunately, this is only a 404 page which means the one you are looking for does not
            exist.
          </Text>
          <Group justify="center">
            <Button
              size="md"
              m="lg"
              variant="outline"
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
