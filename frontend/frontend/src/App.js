import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./utils/ProtectedRoute";
import PublicRoutes from "./utils/PublicRoutes";
import LoginPage from "./pages/LoginPages";
import SignupPage from "./pages/SignupPage";
import MainRoutes from "./Routes/MainRoutes";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
       <Provider store={store}>
      <MainRoutes/>
    </Provider>
    </div>
  );
}

export default App;
