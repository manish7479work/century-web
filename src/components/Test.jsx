import React from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Avatar, Stack } from '@mui/material';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const stats = [
    {
        title: 'Total Applications',
        value: 5672,
        percent: 74,
        color: '#6A5AE0',
        trend: 'up',
        change: '+14% Inc',
        changeColor: '#6A5AE0'
    },
    {
        title: 'Shortlisted Candidates',
        value: 3045,
        percent: 60,
        color: '#F8B32C',
        trend: 'up',
        change: '+06% Inc',
        changeColor: '#F8B32C'
    },
    {
        title: 'Rejected Candidates',
        value: 1055,
        percent: 46,
        color: '#FF6D6D',
        trend: 'down',
        change: '+04% Dec',
        changeColor: '#FF6D6D'
    }
];

const StatCard = ({ title, value, percent, color, trend, change, changeColor }) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2, minWidth: 250 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary" mb={1}>{title}</Typography>
                <Typography variant="h5" fontWeight="bold">{value}</Typography>

                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant="determinate"
                            value={percent}
                            size={40}
                            thickness={4}
                            sx={{ color }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="caption" component="div" color="text.secondary">
                                +{percent}%
                            </Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Avatar
                        sx={{ bgcolor: changeColor, width: 20, height: 20 }}
                        variant="rounded"
                    >
                        {trend === 'up' ? (
                            <FaArrowUp style={{ color: '#fff', fontSize: 12 }} />
                        ) : (
                            <FaArrowDown style={{ color: '#fff', fontSize: 12 }} />
                        )}
                    </Avatar>
                    <Typography variant="caption" sx={{ color: changeColor }}>{change}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

const DashboardStats = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
                {stats.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <StatCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardStats;
