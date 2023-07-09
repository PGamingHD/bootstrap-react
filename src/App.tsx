import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

//COMPONENTS
import Home from "./components/home/Home";
import Header from "./components/header/Header.tsx";
import Staff from "./components/staff/Staff.tsx";
import Profile from "./components/profile/Profile.tsx";
import Error from "./components/404/Error.tsx";
import Contact from "./components/contact/Contact.tsx";
import Projects from "./components/projects/projects.tsx";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/staff" element={<Staff />}></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth loginPath="/">
                <Profile />
              </RequireAuth>
            }
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
