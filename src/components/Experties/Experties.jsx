import React from "react";
import { projectExperience, WhatDoIHelp } from "../../utils/data";
import css from "./Experties.module.scss";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion.js";
import SocialMedia from "../SocialMedia/SocialMedia";
const Experties = () => {
  return (
    <section className={css.wrapper}>
      <a className="anchor" id="experties"></a>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`paddings yPaddings innerWidth flexCenter ${css.container}`}
      >
        {/* left side */}
        <div className={css.leftSide}>
          {projectExperience.map((exp, i) => {
            return (
              <motion.div
                variants={fadeIn("right", "tween", (i + 1) * 0.2, 1)}
                className={css.exp}
                key={i}
              >
                <div style={{ background: exp.bg }} className="flexCenter">
                  <exp.icon size={25} color="white" />
                </div>
                <div>
                  <span>{exp.name}</span>
                  <span className="secondaryText" style={{fontSize:"0.7rem", lineHeight:"0.9rem"}}>{exp.projects}</span>
                </div>
              </motion.div>
            );
          })}
          <SocialMedia/>
        </div>

        {/* right */}
        <motion.div variants={textVariant(0.5)} className={css.rightSide}>
          <span className="primaryText">Have you heard about <span className="text-success"> SDA Social? </span></span>
          <span className="secondaryText">
            Discover a community of like-minded individuals on SDA Social, the
            social media platform designed for Seventh-Day Adventists. Share
            your spiritual journey and be encouraged by others on the same path.
            Connect with fellow believers and discover a wealth of uplifting and
            inspiring content. Don't miss out on this opportunity to grow in
            your faith and make meaningful connections. <br/><br/>Join SDA Social today
            and let's journey together!
          </span>

          <div className={`flexCenter ${css.stats}`}>
            <div className={`flexCenter ${css.stat}`}>
              <span className="primaryText">285+</span>
              <span className="secondaryText">Connect with other Seventh-Day Adventists</span>
            </div>
            <div className={`flexCenter ${css.stat}`}>
              <span className="primaryText">190+</span>
              <span className="secondaryText">Happy Clients</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experties;
