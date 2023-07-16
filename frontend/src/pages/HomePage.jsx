import React, { useState, useEffect } from 'react'
import { Grid, Button, ButtonGroup, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {

    const navigate = useNavigate()

    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        const useFetchRequest = () => {
            fetch("http://127.0.0.1:8000/api/user-in-room", { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setRoomCode(data.code)
                })
        }
        useFetchRequest()
        if (roomCode) {
            navigate(`/room/${roomCode}`)
        }
    }, [[roomCode]])


    return (
        <div className='center '>
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage