import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import css from "./Footer.module.scss";
import { motion } from "framer-motion";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-container" id="more">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Receive news and updates from SDA Kampala central church via email.
        </p>
        <p className="footer-subscriptiNameon-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <button className="new-btn">Subscribe</button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Useful Links</h2>
            <div className="LinkDiv">Church bulletin</div>
            <div className="LinkDiv">Live stream</div>
            <div className="LinkDiv">Events</div>
            <div className="LinkDiv">Church Projects</div>
            <div className="LinkDiv">Families</div>
            <div className="LinkDiv">Tithe and Offertory</div>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <div className="LinkDiv">Contact</div>
            <div className="LinkDiv">Support/Donate</div>
            <div className="LinkDiv">About us</div>
            <div className="LinkDiv">Location</div>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div classNameN="footer-link-items">
            <h2>Media</h2>
            <div className="LinkDiv">Sermons Archive</div>
            <div className="LinkDiv">Music</div>
            <div className="LinkDiv">Galary/Updates</div>
            <div className="LinkDiv">Podcasts</div>
            <div className="LinkDiv">Articles</div>
            <div className="LinkDiv">Book Library</div>
          </div>
          <div classNameN="footer-link-items">
            <h2>Social Media</h2>
            <a
              href={`https://social.kampalacentraladventist.org`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {"   "}
              <div className="LinkDiv">{"  "} Instagram</div>
            </a>
            <a
              href={`https://facebook.com/sdakampalacentral`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div className="LinkDiv">Facebook</div>
            </a>
            <a
              href={`https://www.youtube.com/c/sdakcc`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div className="LinkDiv">Youtube</div>
            </a>
            <a
              href={`https://www.twitter.com/sdakcc`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div className="LinkDiv">Twitter</div>
            </a>
            <a
              href={`https://social.kampalacentraladventist.org/termsofservice`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div className="LinkDiv">Terms of service</div>
            </a>
            <a
              href={`https://social.kampalacentraladventist.org/privacypolicy`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div className="LinkDiv">Privacy policy</div>
            </a>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <div className="social-logo">
              SDA KCC
              <img src="logo.png" alt="" />
            </div>
          </div>
          <small className="website-rights">SDA KCC © 2022</small>
          <div className="social-icons">
            <div
              className="social-icon-link facebook"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </div>
            <div
              class="social-icon-link instagram"
              targetName="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </div>
            <div
              className="social-icon-link youtube"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </div>
            <div
              className="social-icon-link twitter"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </div>
            <div
              className="social-icon-link twitter"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
