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

const Home = () => (
  <>
    <Hero />
    <Experties />
    <Work />
    <Portfolio />
    <People />
    <Footer />
    <DonationForm />
  </>
);

const App = () => {
  return (
    <div className={`bgPrimary ${css.container}`}>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<BlogsMany />} />
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
      </Router>
    </div>
  );
};

export default App;
