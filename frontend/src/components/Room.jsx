import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Grid, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CreateRoomPage from '../pages/CreateRoomPage'



const Room = () => {

    const navigate = useNavigate()

    const [roomSettings, setRoomSettings] = useState({
        votesToSkip: "",
        guestCanPause: false,
        isHost: false,
        showSettings: false,
        spotifyAuthenticated: false,
    })

    const { roomCode } = useParams()

    const getRoomDetails = () => {
        fetch(`http://127.0.0.1:8000/api/get-room?code=${roomCode}`, { credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error fetching room details');
                }
                return response.json();
            })
            .then((data) => {
                setRoomSettings({
                    votesToSkip: data.votesToSkip,
                    guestCanPause: data.guestCanPause,
                    isHost: data.isHost,
                });
            })
    }


    useEffect(() => {
        getRoomDetails()
        authenticatedSpotify()
    }, [])

    const authenticatedSpotify = () => {
        fetch("http://127.0.0.1:8000/spotify/is-authenticated", { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setRoomSettings((prev) => {
                    return ({
                        ...prev,
                        spotifyAuthenticated: data.status,
                    })
                })
                console.log(data.status);
                if (!data.status) {
                    fetch("http://127.0.0.1:8000/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }
        fetch('http://127.0.0.1:8000/api/leave-room', requestOptions)
            .then((response) => response.json())
            .then((data) => navigate('/'))
    }

    const updateShowSettings = () => {
        setRoomSettings((prev) => {
            return ({
                ...prev,
                showSettings: !prev.showSettings,
            })
        })
    }


    return (
        <>
            {roomSettings.showSettings ? (
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} align="center">
                            <CreateRoomPage
                                update={true}
                                votesToSkip={roomSettings.votesToSkip}
                                guestCanPause={roomSettings.guestCanPause}
                                roomCode={roomCode}
                                updateCallBack={getRoomDetails}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={updateShowSettings}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" component="h4">
                                Code: {roomCode}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography variant="h6" component="h6">
                                Votes: {roomSettings.votesToSkip}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography variant="h6" component="h6">
                                Guest Can Pause: {roomSettings.guestCanPause.toString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography variant="h6" component="h6">
                                Host: {roomSettings.isHost.toString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={leaveButtonPressed}
                            >
                                Leave Room
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} align="center">
                        {roomSettings.isHost &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={updateShowSettings}
                            >
                                Settings
                            </Button>
                        }
                    </Grid>
                </div>
            )}
        </>
    )
}

export default Room