// src/App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./screen/auth/LoginScreen";
import Register from "./screen/auth/RegisterScreen";
import OTPVerification from "./screen/auth/VerifyScreen";
import HomePage from "./screen/LandingPage";
////
import NotFound from "./screen/kol/pages/NotFound";
import DashboardKOL from "./screen/kol/pages/Dashboard";
import MainLayout from "./screen/kol/layouts/MainLayout";
import Campaigns from "./screen/kol/pages/Campaigns";
import RateCard from "./screen/kol/pages/RateCard";
import Wallet from "./screen/kol/pages/Wallet";
import Contract from "./screen/kol/pages/Contract";
import Balance from "./screen/kol/pages/Balance";
import Invoice from "./screen/kol/pages/Invoice";
import DashboardBrand from "./screen/kol/pages2/Dashboard";
import CreateCampaign from "./screen/kol/pages2/CreateCampaign";
import DaftarCampaign from "./screen/kol/pages2/DaftarCampaign";
import PermintaanEndorse from "./screen/kol/pages2/PermintaanEndorse";
import PencarianInfluencer from "./screen/kol/pages2/CariInfluencer";
import PrivacyPolicy from "./screen/KebijakanPrivasi";
import TermsAndConditions from "./screen/Termandcondition";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/term" element={<TermsAndConditions/>}/>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Verify" element={<OTPVerification />} />

        {/* Nested route for AppKOL */}
        <Route path="/appimpact" element={<MainLayout />}>
          <Route path="dashboard" index element={<DashboardKOL />} /> {/* default /AppKOL */}
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="rate-card" element={<RateCard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="contract" element={<Contract />} />
          <Route path="balance" element={<Balance />} />
          <Route path="invoice" element={<Invoice />} />

          <Route path="dashboardBrand" element={<DashboardBrand />} />
          <Route path="createCampaign" element={<CreateCampaign />} />
          <Route path="daftarCampaign" element={<DaftarCampaign />} />
          <Route path="permintaanEndorse" element={<PermintaanEndorse />} />
          <Route path="PencarianInfluencer" element={<PencarianInfluencer />} />

        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
