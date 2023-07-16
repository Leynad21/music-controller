import React, { useState } from 'react'
import { Button, Grid, Typography, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RoomJoinPage = () => {

  const navigate = useNavigate()

  const [joinRoom, setJoinRoom] = useState({
    roomCode: "",
    error: "",
  })

  const handleTextFieldChange = (e) => {
    setJoinRoom((prev) => {
      return ({
        ...prev,
        roomCode: e.target.value
      })
    })
  }

  const roomButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: joinRoom.roomCode
      }),
      credentials: 'include'
    }
    fetch("http://127.0.0.1:8000/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate('/room/' + joinRoom.roomCode)
        } else {
          setJoinRoom((prev) => {
            return ({
              ...prev,
              error: "Room not found."
            })
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }





  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={joinRoom.error}
          label="Code"
          placeholder="Enter a Room Code"
          value={joinRoom.roomCode}
          helperText={joinRoom.error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

export default RoomJoinPage