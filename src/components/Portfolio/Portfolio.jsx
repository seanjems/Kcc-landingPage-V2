import React from "react";
import { motion } from "framer-motion";
import css from "./Portfolio.module.scss";
import Slider from "react-slick";
import {
  fadeIn,
  staggerChildren,
  textVariant,
  textVariant2,
} from "../../utils/motion";
const Portfolio = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="portfolio"></a>

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div
          variants={textVariant(0.4)}
          className={`flexCenter ${css.heading}`}
        >
          <div>
            <span className="primaryText">Articles & Sermons</span>
            <p style={{ marginTop: "10px" }}>
              Here are the top articles from SDA KCC church members. You can
              also contribute articles via{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    "https://social.kampalacentraladventist.org",
                    "_blank"
                  )
                }
              >
                SDA social
              </span>
              .
            </p>
          </div>
          <span className="secondaryText">More Articles</span>
        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          <motion.div variants={fadeIn("up", "tween", 0.5, 0.6)}>
            <img src="./showCase1.png" alt="project" />
            <div className={css.bio}>
              <span>Dangers of harmless fun</span>
              <span>by Pr Kiggundu Bennon</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn("up", "tween", 0.7, 0.6)}>
            <img src="./showCase2.png" alt="project" />
            <div className={css.bio}>
              <span>
                Delicious Vegeterian meals you can prepare at home easily
              </span>
              <span>by Sis Faridah Nakato</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn("up", "tween", 0.9, 0.6)}>
            <img src="./showCase3.png" alt="project" />
            <div className={css.bio}>
              <span>How to overcome Social media addiction</span>
              <span>by Eld Kevin Muheirwe</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
