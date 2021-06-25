import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Checkbox,
    ListItemText,
    Input,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 15,
        backgroundColor: '#f2f2f2'
    },
    formControl: {
        margin: theme.spacing(1),
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 3fr)',
        "@media (max-width: 1024px)": {
            display: 'flex',
            flexDirection: 'column'
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function Export() {
    const classes = useStyles();
    const [call, setCall] = useState("");
    const [gender, setGender] = useState("");
    const [personName, setPersonName] = useState([]);
    const [numberOfChildrens, setNumberOfChildrens] = useState(null);

    const handleChange = (e) => setCall(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handlePersonNameChange = (e) => setPersonName(e.target.value);
    const handleNumberOfChildrens = (e) => setNumberOfChildrens(e.target.value);

    return (
        <Grid>
            <Paper className={classes.paper}>
                <Grid className={classes.formGrid}>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Call</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={call}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Mr."}>Mr.</MenuItem>
                            <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                        </Select>
                        <FormHelperText>Select Call</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={gender}
                            onChange={handleGenderChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                        <FormHelperText>Select Gender</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Users</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handlePersonNameChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Select User</FormHelperText>
                    </FormControl>

                    <TextField
                        className={classes.formControl}
                        id="standard-number"
                        label="# Children"
                        type="number"
                        value={numberOfChildrens}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { 
                                min: 1 
                            }
                        }}
                        onChange={handleNumberOfChildrens}
                    />

                </Grid>
                <Button variant="contained" color="primary">
                    EXPORT
                </Button>

                <pre>
                    {JSON.stringify({
                        call,
                        gender,
                        personName,
                        numberOfChildrens
                    }, null, 2)}
                </pre>
            </Paper>
        </Grid>
    )
}
