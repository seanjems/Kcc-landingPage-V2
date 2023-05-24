import React from "react";
import Experties from "./components/Experties/Experties";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import People from "./components/People/People";
import Portfolio from "./components/Portfolio/Portfolio";
import Work from "./components/Work/Work";
import css from "./styles/App.module.scss";
import DonationForm from "./components/Donations/DonationForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogsSingle from "./Pages/Blogs/BlogsSingle";
import BlogsMany from "./Pages/Blogs/BlogsMany";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OffertoryPage from "./Pages/Offertory/OffertoryPage";
import { ChakraProvider } from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.scss";

const Home = () => (
  <>
    <Hero />
    <Experties />
    <Work />
    <Portfolio />
    <People />
  </>
);

const App = () => {
  return (
    <div className={`bgPrimary ${css.container}`}>
      <ChakraProvider>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AezVIu7szn3_vKJ_uQHbYn-sKA1ogFURTu7h0Q7BUexSj9SK-N8fhDaQlhijAJmhNr9ALqv6aDHdT3dT",
            // "AUdkzIbIcndnIN_ER6KkG7Vqe8P9L3O_b-BqY6F1fca8TJ26XogY3PQbckoxp4siAMyJBS0as6WVhHAR",
            currency: "USD",
          }}
        >
          <Router>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" exact element={<BlogsMany />} />
              <Route path="/donation" exact element={<OffertoryPage />} />
              <Route path="/articles/:id" element={<BlogsSingle />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here! Please check the url</p>
                  </main>
                }
              />
            </Routes>
            <Footer />
          </Router>
        </PayPalScriptProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
