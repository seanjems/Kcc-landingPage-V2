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
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const Portfolio = () => {
  const [fetchedList, setFetchedList] = useState();
  useEffect(() => {
    fetchThree();
  }, []);
  const fetchThree = async () => {
    return fetch(
      // `${"https://api.kampalacentraladventist.org/"}api/YouTubeChannel/GetYoutubeVideos?page=1&pageSize=5`,
      `${"https://localhost:7204"}/api/Articles?pageNumber=${1}&pageSize=${5}`,
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
        console.log("🚀 ~ file: Portfolio.jsx:34 ~ .then ~ data:", data);

        setFetchedList(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  const navigate = useNavigate();
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
          <span
            className="secondaryText"
            onClick={() => navigate("../articles")}
          >
            More Articles
          </span>
        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          {fetchedList &&
            fetchedList.slice(0, 3)?.map((article, key) => (
              <>
                <motion.div
                  key={key}
                  variants={fadeIn("up", "tween", 0.5, 0.6)}
                  onClick={() => navigate(`../articles/${article.id}`)}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "20rem",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={article.coverImage}
                    alt="project"
                  />
                  <div className={css.bio}>
                    <span>{article.articleTitle}</span>
                    <span>by {article.authorName}</span>
                  </div>
                </motion.div>
              </>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
