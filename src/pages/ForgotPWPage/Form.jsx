import { useState } from 'react'
import {
    Typography,
    Paper,
    makeStyles,
    Box,
    TextField,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '500px',
        margin: 'auto',
        textAlign: 'center'
    }
}));

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(String(value).toLowerCase());

const Form = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(undefined);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isEmail(email)){
            //ka daryt jei gerai
            setEmailError(undefined)
        } else {
            //klaidu formavimas
            setEmailError('bad email')
        }

    }

    return (
        <form classes={classes.root} onSubmit={handleSubmit}>
            <Paper elevation={4}>
                <Box p={3}>
                    <Typography variant="h4" component="h1" gutterBottom>Forgotten Password</Typography>
                    <TextField
                        label="email"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        required 
                        error={emailError}
                        helperText={emailError ?? false}
                        />
                    <Box mt={3}>
                        <Button variant="contained" color="primary" type="submit">Send password reset</Button>
                    </Box>
                </Box>
            </Paper>
        </form>
    )
}

export default Form
