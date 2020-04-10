import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {Settings, Info, Close} from "@material-ui/icons";
// @ts-ignore
import { useBus, useListener } from 'react-bus';
import {Grow, Card, CardHeader, CardContent} from "@material-ui/core";
import {AboutGraphimata} from './common/strings';
import { GraphView } from './components/GraphView';

export const graphimataTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        flexFlow: "column",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    graphimataContent: {
        //border: "solid 10px red",
        boxSizing: "border-box",
        flex: "1 1 auto"
    },
    aboutCard: {
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "20px",
        marginBottom: "20px"
    }
}));

function App() {

    const classes = useStyles();
    const bus = useBus();

    const [showCard, setShowCard] = React.useState(window.localStorage.getItem("hideCard") === "true" ? false : true);

    useListener('hideCard_changed', React.useCallback((state: boolean) => {
        setShowCard(!state);
        window.localStorage.setItem("hideCard", state.toString());
    }, []))

    React.useEffect(() => {
        console.log(showCard);
    }, [showCard]);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={graphimataTheme}>
                <AppBar position="static" variant="outlined" color="transparent" style={{marginLeft: "-1px", marginTop: "-1px"}}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Graphimata
                        </Typography>
                        <Button color="inherit" aria-label="Information" onClick={() => bus.emit('hideCard_changed', false)}>
                            <Info></Info>
                        </Button>
                        <Button color="inherit" aria-label="Config">
                            <Settings></Settings>
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.graphimataContent}>
                    <Grow in={showCard}>
                        <Card variant="outlined" className={classes.aboutCard}>
                            <CardHeader
                                title="About Graphimata"
                                action={
                                    <IconButton aria-label="Hide about card" onClick={() => bus.emit('hideCard_changed', true)}>
                                        <Close/>
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <AboutGraphimata />
                            </CardContent>
                        </Card>
                    </Grow>
                    <GraphView/>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
