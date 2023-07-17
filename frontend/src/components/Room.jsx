import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Grid, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CreateRoomPage from '../pages/CreateRoomPage'
import MusicPlayer from './MusicPlayer'



const Room = () => {

    const navigate = useNavigate()

    const [roomSettings, setRoomSettings] = useState({
        votesToSkip: "",
        guestCanPause: false,
        isHost: false,
        showSettings: false,
        spotifyAuthenticated: false,
        song: {},
    })

    const { roomCode } = useParams()

    const getRoomDetails = () => {
        fetch(`http://127.0.0.1:8000/api/get-room?code=${roomCode}`, { credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error fetching room details')
                }
                return response.json()
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
        const interval = setInterval(getCurrentSong, 100000);

        return () => {
            clearInterval(interval)
        }
    }, [])


    useEffect(() => {
        getRoomDetails()
        authenticatedSpotify()
        getCurrentSong()
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

    const getCurrentSong = () => {
        fetch("http://127.0.0.1:8000/spotify/current-song", { credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                setRoomSettings((prev) => ({
                    ...prev,
                    song: data,
                }))
                console.log(data);
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
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h4" component="h4">
                            Code: {roomCode}
                        </Typography>
                    </Grid>
                    <MusicPlayer {...roomSettings.song} />
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
        </>
    )
}

export default Room