import logo from './logo.svg';
import './App.css';
import Sequence from './Sequence';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
    const theme = createTheme({
        palette: {
            type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Sequence />
        </ThemeProvider>
    );
}

export default App;
