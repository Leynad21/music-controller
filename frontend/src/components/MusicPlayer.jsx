import React, { Component } from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from "@mui/icons-material/SkipNext";

const MusicPlayer = (props) => {

    const songProgress = (props.time / props.duration) * 100

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        fetch("http://127.0.0.1:8000/spotify/pause", requestOptions)
    }

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        fetch("http://127.0.0.1:8000/spotify/play", requestOptions)
    }

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        fetch("http://127.0.0.1:8000/spotify/skip", requestOptions)
    }


    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={() => props.is_playing ? pauseSong() : playSong()}>
                            {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={() => skipSong()}>
                            <SkipNextIcon /> {props.votes} / {props.votes_required}
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}

export default MusicPlayer