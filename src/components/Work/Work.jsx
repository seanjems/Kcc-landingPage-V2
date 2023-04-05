import React, { useEffect, useState } from "react";
import css from "./Work.module.scss";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import FsLightbox from "fslightbox-react";
import {
  draw,
  fadeIn,
  slideIn,
  staggerChildren,
  textVariant2,
  zoomIn,
} from "../../utils/motion";

const Work = () => {
  const [fetchedList, setFetchedList] = useState();
  const [toggler, setToggler] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }
  const startVideoPlayer = (videoId) => {
    setSelectedVideo(videoId);
    setToggler(!toggler);
  };
  async function fetchVideos() {
    return fetch(
      // `${"https://api.kampalacentraladventist.org/"}api/YouTubeChannel/GetYoutubeVideos?page=1&pageSize=5`,
      `${"https://localhost:7204/"}api/YouTubeChannel/GetYoutubeVideos?page=1&pageSize=5`,
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
        console.log("🚀 ~ file: Work.jsx:28 ~ .then ~ data:", data);

        if (!data) {
          console.log("error on api call", data);
          return;
        }

        setFetchedList(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={[
          // <ReactPlayer
          //   url={`https://www.youtube.com/watch?v=${selectedVideo}`}
          //   width="1920px"
          //   height="1080px"
          //   aspectRatio="16:9"
          //   playing
          //   config={{
          //     youtube: {
          //       playerVars: {
          //         origin: "https://www.youtube.com",
          //       },
          //     },
          //   }}
          // />,

          // <div
          //   className="showOnMobileOnly"
          //   style={{ width: "100%", height: "100%" }}
          // >
          //   <ReactPlayer
          //     url={`https://www.youtube.com/watch?v=${selectedVideo}`}
          //     width="100%"
          //     height="100%"
          //     playsinline
          //     playing
          //   />
          // </div>,
          // <div>
          // <ReactPlayer
          //   url={`https://www.youtube.com/watch?v=${selectedVideo}`}
          //   controls
          //   playing
          // />,
          // </div>,
          // <div className="player-wrapper">
          //   <ReactPlayer
          //     url={`https://www.youtube.com/watch?v=${selectedVideo}`}
          //     width="100%"
          //     height="100%"
          //     controls
          //     playing
          //   />
          // </div>,
          // <iframe
          //   src={`https://www.youtube.com/watch?v=${selectedVideo}`}
          //   title="SDA Kampala Central"
          //   height="1080"
          //   width="1920"
          //   referrerpolicy="*"
          //   scrolling="no"
          //   allow="autoplay; fullscreen"
          // ></iframe>,
          <iframe
            width="1920"
            height="1080"
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1&modestbranding=0&showinfo=0&rel=0&disablekb=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
            allowFullScreen
          ></iframe>,
        ]}
      />

      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`paddings ${css.wrapper}`}
      >
        <a className="anchor" id="work"></a>

        <div className={`innerWidth flexCenter ${css.container}`}>
          {/* heading */}
          <span className="primaryText yPaddings">Event Timeline</span>

          <div className={`flexCenter ${css.experiences}`}>
            {fetchedList &&
              fetchedList.map((fetchedList, i) => {
                return (
                  <motion.div
                    variants={textVariant2}
                    key={i}
                    className={`flexCenter ${css.exp}`}
                  >
                    <div
                      className={css.post}
                      onClick={() => startVideoPlayer(fetchedList.videoId)}
                    >
                      <h6>{fetchedList.title}</h6>
                      <p>
                        {" "}
                        {format(
                          convertUTCDateToLocalDate(
                            new Date(fetchedList.publishTime)
                          )
                        )}
                      </p>
                    </div>
                    <div className={css.role}>
                      <img
                        onClick={() => startVideoPlayer(fetchedList.videoId)}
                        src={fetchedList.thumbnailUrl}
                        alt=""
                        style={{
                          borderRadius: "5px",
                          width: "100%",
                          marginTop: "4rem",
                          marginBottom: "4rem",
                        }}
                      />
                      {/* <p>{fetchedList.description}</p> */}
                    </div>
                  </motion.div>
                );
              })}

            <motion.div variants={zoomIn(1, 1)} className={css.progressbar}>
              <motion.div
                variants={fadeIn("down", "tween", 2, 1.5)}
                className={css.line}
              ></motion.div>
              <div>
                <div
                  className={css.circle}
                  style={{ background: "#286F6C" }}
                ></div>
              </div>
              <div>
                <div
                  className={css.circle}
                  style={{ background: "#F2704E" }}
                ></div>
              </div>
              <div>
                <div
                  className={css.circle}
                  style={{ background: "#EEC048" }}
                ></div>
              </div>
              <div>
                <div
                  className={css.circle}
                  style={{ background: "#286F6C" }}
                ></div>
              </div>
              <div>
                <div
                  className={css.circle}
                  style={{ background: "#F2704E" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Work;
