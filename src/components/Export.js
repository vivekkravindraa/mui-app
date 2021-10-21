import React, { useState, useEffect, useRef } from 'react'
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
    TextField,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { CSVLink } from "react-csv";

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
    },
    exportGrid: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },   
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

/**
    const listOfUsers = [
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
*/

const headers = [
    { label: "Name", key: "name" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Website", key: "website" }
];

export default function Export() {
    const csvLinkEl = useRef();
    const classes = useStyles();
    const [selectedName, setSelectedName] = useState("");
    const [selectedUsername, setSelectedUsername] = useState("");
    const [listOfUsers, setListOfUsers] = useState([])
    const [listOfWebsites, setListOfWebsites] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [dataSize, setDataSize] = useState(null);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(true);

    const handleNameChange = (e) => setSelectedName(e.target.value);
    const handleUsernameChange = (e) => setSelectedUsername(e.target.value);
    const handleWebsites = (e) => setWebsites(e.target.value);
    const handleDataSize = (e) => setDataSize(e.target.value >= 1 ? e.target.value : null);

    useEffect(() => {
        callAPIs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const callAPIs = async () => {
        const data = await getUserList();
        setTimeout(() => {
            setOpen(false);
            setData(data);
            setListOfUsers(data.map(item => item.name));
            const allData = data.map(item => item.website)
            // allData.unshift("All");
            setListOfWebsites(allData);
        }, 1000);
    }

    const getUserList = () => {
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json());
    }
     
    const downloadReport = async () => {
        const data = await getUserList();
        if(dataSize >= 1) {
            const slicedArray = data.slice(0, dataSize);
            console.table(slicedArray);
            setData(slicedArray);
            setOpen(true);
            setTimeout(() => {
                csvLinkEl.current.link.click();
                setOpen(false);
            },1000);
        } else {
            console.table(data);
            setData(data);
            setOpen(true);
            setTimeout(() => {
                csvLinkEl.current.link.click();
                setOpen(false);
            },1000);
        }
    }

    return (
        <Grid>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Paper className={classes.paper}>
                <Grid className={classes.formGrid}>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Select Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedName}
                            onChange={handleNameChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {listOfUsers.map((name, index) => {
                                return <MenuItem key={index} value={name}>{name}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Select Name</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Select Username</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedUsername}
                            onChange={handleUsernameChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {data.filter(item => item.name === selectedName).map((item, index) => {
                                return <MenuItem key={index} value={item.username}>{item.username}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Select Username</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Select Websites</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={websites}
                            onChange={handleWebsites}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {listOfWebsites.map((website) => (
                                <MenuItem key={website} value={website}>
                                    <Checkbox checked={websites.indexOf(website) > -1} />
                                    <ListItemText primary={website} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Select Websites</FormHelperText>
                    </FormControl>

                    <TextField
                        className={classes.formControl}
                        id="standard-number"
                        label="Select Data Size"
                        type="number"
                        value={dataSize}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { 
                                min: 1 
                            }
                        }}
                        onChange={handleDataSize}
                    />
                </Grid>

                <Grid className={classes.exportGrid}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        value="Export to CSV (Async)"
                        onClick={downloadReport}
                    >
                        EXPORT
                    </Button>
                    <CSVLink
                        headers={headers}
                        filename="MineTheBase.csv"
                        data={data}
                        ref={csvLinkEl}
                    />
                </Grid>

                {/* <pre>
                    {JSON.stringify({
                        selectedName,
                        selectedUsername,
                        websites,
                        sampleSize
                    }, null, 2)}
                </pre> */}
            </Paper>
        </Grid>
    )
}
