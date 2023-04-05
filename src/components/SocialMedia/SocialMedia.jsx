import React from "react";
// import { PostsData } from "../../data/PostsData";
import rightArrow from "../../assets/rightArrow.png";
import "./SocialMedia.css";
import { useState } from "react";
import _ from "lodash";
import { useEffect } from "react";

const SocialMedia = () => {
  const [fetchedList, setFetchedList] = useState();

  useEffect(() => {
    fetchTopPosts();
  }, []);

  async function fetchTopPosts() {
    return fetch(
      `${"https://api.kampalacentraladventist.org/"}api/Posts?page=${1}&userProfileId=&userName=`,
      // `${"https://localhost:7204/"}api/Posts?page=${1}&userProfileId=&userName=`,
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

        var shuffledList = _.shuffle(data).slice(0, 4);
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
    <div className="socialmedia" id="socialmedia">
      {/* <div className="socialHeading">
        <span className="stroke-text">News and</span>
        <span>stories from</span>
        <span className="stroke-text"> your church</span>
      </div> */}
      {fetchedList && (
        <div className="trendingCards">
          {fetchedList.map((post, idx) => (
            <div className="postsCard" key={idx}>
              <div className="postersName">
                <img src={post.creatorUSer.profilePicUrl} alt="" />
                <div className="followername">
                  <span className="FollowerName">
                    {post.creatorUSer.firstName} {post.creatorUSer.lastName}
                  </span>
                  <span>@{post.creatorUSer.userName}</span>
                </div>
              </div>
              <div className="descriptionAndPic">
                <span>
                  {post.desc.length < 121
                    ? post.desc
                    : post.desc.substring(0, 120) + " ..."}
                </span>
                <img src={post.img} alt="" />
              </div>
              <div className="placeholderDiv"></div>
              <a
                href={`https://social.kampalacentraladventist.org/post/${post.id}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <div className="connectSection" style={{ cursor: "pointer" }}>
                  <span>Connect</span>
                  <img src={rightArrow} alt="" />
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
