import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./components/Header";
import Display from "./pages/Form.jsx";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import FormCreation from "./pages/FormCreation";
import { FormProvider } from "./context/form.context.jsx";
import Auth from "./components/Auth.jsx";
import { ProtectedRoute } from "./components/protectedRoute.jsx";
import FormManage from "./pages/FormManage.jsx";
import FormSubmission from "./pages/FormSubmission.jsx";
import Form from "./pages/Form.jsx";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form/:formId" element={<Form />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:formId"
            element={
              <ProtectedRoute>
                <FormManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:formId/submission"
            element={
              <ProtectedRoute>
                <FormSubmission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <FormProvider>
                <ProtectedRoute>
                  <FormCreation />
                </ProtectedRoute>
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
