import { Card, CardContent, Typography, LinearProgress, Box, Collapse, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Edit } from '@mui/icons-material';
import { useState } from 'react';

interface ActivityCardProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
}

export const ActivityCard = ({ title, current, goal, unit }: ActivityCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const progress = Math.min((current / goal) * 100, 100);

  // Mock data for past 7 days
  const pastWeekData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: Math.floor(Math.random() * goal)
  }));

  return (
    <Card sx={{ 
      width: '100%',
      height: '100%',
      transition: 'transform 0.2s ease-in-out',
      '&:active': {
        transform: 'scale(1.02)'
      }
    }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 1.5 }}>
          {current.toLocaleString()} {unit}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Goal: {goal.toLocaleString()} {unit}
          </Typography>
          <IconButton size="small" sx={{ padding: 0 }}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mt: 2,
            cursor: 'pointer'
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="body2" color="primary">
            {expanded ? 'Hide History' : 'Show History'}
          </Typography>
          {expanded ? <KeyboardArrowUp color="primary" /> : <KeyboardArrowDown color="primary" />}
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ position: 'relative', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            {pastWeekData.map((day, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {day.date}
                </Typography>
                <Typography variant="body2">
                  {day.value.toLocaleString()} {unit}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};