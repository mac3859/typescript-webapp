import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ActivityCard } from './ActivityCard';
import axios from 'axios';

interface ActivityData {
  steps: { current: number; goal: number };
  distance: { current: number; goal: number };
  sleep: { current: number; goal: number };
}

interface CardConfig {
  id: string;
  title: string;
  dataKey: keyof ActivityData;
  unit: string;
}

export const Dashboard = () => {
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cardOrder, setCardOrder] = useState<CardConfig[]>([
    { id: '1', title: 'Steps', dataKey: 'steps', unit: 'steps' },
    { id: '2', title: 'Distance', dataKey: 'distance', unit: 'km' },
    { id: '3', title: 'Sleep', dataKey: 'sleep', unit: 'hours' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/activities');
        setActivityData(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
        setError('Failed to load activity data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDragStart = (e: React.DragEvent, fromIndex: number) => {
    e.dataTransfer.setData('text/plain', fromIndex.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData('text/plain'));
    const newOrder = [...cardOrder];
    const [movedCard] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedCard);
    setCardOrder(newOrder);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Activity Dashboard
          </Typography>
          <Button
            variant="outlined"
            onClick={() => signOut(auth)}
            color="primary"
          >
            Logout
          </Button>
        </Box>
        <Typography>Loading activity data...</Typography>
      </Container>
    );
  }

  if (error) {
    console.error('Error state:', error);
  }

  const defaultActivityData = {
    steps: { current: 0, goal: 10000 },
    distance: { current: 0, goal: 10 },
    sleep: { current: 0, goal: 8 }
  };

  const displayData = activityData || defaultActivityData;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Activity Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setIsEditMode(!isEditMode)}
            color="primary"
            sx={{ mr: 2 }}
          >
            {isEditMode ? 'Done' : 'Edit Order'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => signOut(auth)}
            color="primary"
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {cardOrder.map((card, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={card.id}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            sx={{
              cursor: isEditMode ? 'move' : 'default',
              position: 'relative',
              zIndex: isEditMode ? 1 : 'auto',
              '&:hover': {
                zIndex: isEditMode ? 2 : 'auto'
              }
            }}
          >
            <ActivityCard
              title={card.title}
              current={displayData[card.dataKey].current}
              goal={displayData[card.dataKey].goal}
              unit={card.unit}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};