import React from "react";
import { comments, sliderSettings } from "../../utils/data";
import css from "./People.module.scss";
import Slider from "react-slick";
import { motion } from "framer-motion";
import _ from "lodash";

import {
  footerVariants,
  staggerChildren,
  textVariant,
  textVariant2,
} from "../../utils/motion";
import { useState } from "react";
import { useEffect } from "react";
import SocialMedia from "../SocialMedia/SocialMedia";
const People = () => {
  const [fetchedList, setFetchedList] = useState();
  console.log("🚀 ~ file: People.jsx:18 ~ People ~ fetchedList:", fetchedList);

  useEffect(() => {
    fetchTopPosts();
  }, []);

  async function fetchTopPosts() {
    return fetch(
      // `${"https://api.kampalacentraladventist.org/"}api/Posts?page=${1}&userProfileId=&userName=`,
      `${"https://localhost:7204/"}api/Posts?page=${1}&userProfileId=&userName=`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "🚀 ~ file: SocialMedia.jsx ~ line 30 ~ .then ~ data",
          data
        );

        if (!data) {
          console.log("error on api call", data);
          return;
        }

        var shuffledList = _.shuffle(data);
        console.log(
          "🚀 ~ file: SocialMedia.jsx ~ line 31 ~ .then ~ shuffledList",
          shuffledList
        );

        setFetchedList(shuffledList);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      section
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="people"></a>

      <motion.div
        variants={footerVariants}
        className={`yPaddings innerWidth ${css.container}`}
      >
        <div className={`flexCenter ${css.heading}`}>
          <span className="primaryText">Stories and Discussions</span>
          <p style={{ marginTop: "2rem", textAlign: "center" }}>
            Here are some of the stories and discussions from church memebers
            via our custom social media system.
          </p>
          <p>You can join the discussion and connect via SDA Social.</p>
        </div>

        <div>
          {/* to use slider , we have to inlcude css in index.html head */}

          <SocialMedia />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default People;
