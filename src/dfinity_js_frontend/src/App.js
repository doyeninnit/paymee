
import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { FiSend, FiShoppingCart, FiUserPlus, FiBriefcase } from "react-icons/fi";
import "./App.css";
import Wallet from "./components/Wallet";
import coverImg from "./assets/img/sandwich.jpg";
import { login, logout as destroy } from "./utils/auth";
import { balance as principalBalance } from "./utils/ledger";
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import RegistrationForm from "./components/marketplace/register";
import SendICP from "./components/marketplace/send";
import BusinessRegistrationForm from "./components/marketplace/registerBusiness";
import PayMerchant from "./components/marketplace/payMerchant";

const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;

  const [balance, setBalance] = useState("0");
  const [activeComponent, setActiveComponent] = useState("");

  const getBalance = useCallback(async () => {
    if (isAuthenticated) {
      setBalance(await principalBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const handleSetActiveComponent = (component) => {
    setActiveComponent(activeComponent === component ? "" : component);
  };

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md" className="app-container">
          <main className="main-content">
            <div className="balance-display">
              <h2>ICPUSD Balance: {balance}</h2>
            </div>
            {activeComponent === "RegisterUser" && <RegistrationForm />}
            {activeComponent === "SendICP" && <SendICP />}
            {activeComponent === "RegisterBusiness" && <BusinessRegistrationForm />}
            {activeComponent === "PayMerchant" && <PayMerchant />}
          </main>
          <Nav className="fixed-bottom navbar-light bg-light">
            <Nav.Item>
              <Nav.Link onClick={() => handleSetActiveComponent("SendICP")}>
                <FiSend /> Send ICP
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleSetActiveComponent("PayMerchant")}>
                <FiShoppingCart /> Pay Merchant
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleSetActiveComponent("RegisterUser")}>
                <FiUserPlus /> Register User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleSetActiveComponent("RegisterBusiness")}>
                <FiBriefcase /> Register Business
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;


