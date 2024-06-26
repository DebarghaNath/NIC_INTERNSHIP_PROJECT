import {
  //BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Detail from "./pages/Detail";
import Data from  "./pages/Data"
import Delete from "./pages/Delete";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ValidationForm from "./pages/ValidationForm";
import Edit from "./pages/Edit";
import Add from "./Add";
//import ProtctedRoute from "./ProtctedRoute";


function App() {
  return(
  <div>

        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/c" element={<Detail/>}/>
            <Route exact path="/l" element={<Data/>}/>
            <Route exact path="/d" element={<Delete/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/add" element={<Add/>}/>
        </Routes> 
    </div>
  );
}

export default App;
