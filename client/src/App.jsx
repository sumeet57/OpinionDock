import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header";
import Display from "./pages/Display";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import FormCreation from "./pages/FormCreation";
import { FormProvider } from "./context/form.context.jsx";
import Auth from "./components/Auth.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/create"
            element={
              <FormProvider>
                <FormCreation />
              </FormProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
