import React, { useState } from 'react'
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const CreateRoomPage = () => {

    const navigate = useNavigate()

    const [createRoom, setCreateRoom] = useState({
        guestCanPause: true,
        votesToSkip: 2,
    })

    const handleChange = (e) => {
        setCreateRoom((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
    }

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votesToSkip: createRoom.votesToSkip,
                guestCanPause: createRoom.guestCanPause
            }),
            credentials: 'include'
        }
        fetch('http://127.0.0.1:8000/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => navigate('/room/' + data.code))
    }


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant='h4' >
                        Create a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={true} name="guestCanPause" onChange={handleChange}>
                            <FormControlLabel value="true" control={<Radio color='primary' />}
                                label="Play/Pause" labelPlacement="bottom" />
                            <FormControlLabel value="false" control={<Radio color='secondary' />}
                                label="No Control" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} name="votesToSkip" type="number" defaultValue={createRoom.votesToSkip} onChange={handleChange}
                            inputProps={{
                                min: 1,
                                style: {
                                    textAlign: "center"
                                }
                            }} />
                        <FormHelperText>
                            <div align="center">
                                Votes Required to Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='secondary' variant='contained' onClick={handleRoomButtonPressed}>Create a Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='primary' variant='contained' to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default CreateRoomPage