import React from "react"

import { BrowserRouter, Routes, Route  } from "react-router-dom"

import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import FAQPage from "./pages/FAQPage"
import HowItWorksPage from "./pages/HowItWorksPage"
import SignUpPage from "./pages/SignUpPage"
import SignUpDriverPage from "./pages/SignUpDriverPage"
import SignUpRiderPage from "./pages/SignUpRiderPage"
import LoginPage from "./pages/LoginPage"
import RiderDashBoard from "./pages/RiderDashBoard"
import DriverDashBoardPage from "./pages/DriverDashBoardPage"
import ProtectedDriver from "./utils/ProtectedDriver"
import ProtectedRider from "./utils/ProtectedRider"
import SharedRidesPage from "./pages/SharedRidesPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/driver" element={<SignUpDriverPage />} />
          <Route path="/signup/rider" element={<SignUpRiderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rider-dashboard"  element={<ProtectedRider><RiderDashBoard /></ProtectedRider>} /> 
          <Route path="/shared-rides" element={<ProtectedRider><SharedRidesPage/></ProtectedRider>} />
          <Route path="/driver-dashboard"  element={<ProtectedDriver><DriverDashBoardPage /></ProtectedDriver>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
      

    </>
  )
}

export default App
