import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <AppBar position="relative" stye={{ backgroundColor: "purple" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Word App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
