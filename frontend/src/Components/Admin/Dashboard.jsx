import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const killSession = () => {
        try {
            localStorage.removeItem('jwtToken');
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/', { replace: true });
        }
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh" 
            bgcolor="#f9f9f9"
            p={4}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ maxWidth: 400, mb: 4 }}>
                You’re logged in as admin. Click below if you want to end your session.
            </Typography>
            <Button 
                variant="contained" 
                color="error" 
                onClick={killSession} 
                sx={{
                    bgcolor: '#ff5e5e',
                    '&:hover': { bgcolor: '#d9534f' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    color: 'white'
                }}
            >
                End Session
            </Button>
        </Box>
    );
};

export default Dashboard;
