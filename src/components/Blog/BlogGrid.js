import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const BlogGrid = () => {
  const [fetchedList, setFetchedList] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchThree();
  }, []);
  const fetchThree = async () => {
    return fetch(
      // `${"https://api.kampalacentraladventist.org/"}api/YouTubeChannel/GetYoutubeVideos?page=1&pageSize=5`,
      `${"https://localhost:7204"}/api/Articles?pageNumber=${pageNumber}&pageSize=${15}`,
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
  function estimateReadingTime(article) {
    const wordsPerMinute = 200; // average reading speed
    const wordCount = article.split(" ").length;
    const minutes = wordCount / wordsPerMinute;
    const roundedMinutes = Math.round(minutes);

    if (roundedMinutes < 1) {
      return "Less than a minute";
    } else {
      return `${roundedMinutes} minute${roundedMinutes !== 1 ? "s" : ""}`;
    }
  }

  return (
    <>
      {/* <!-- Page Content--> */}
      <section class="py-5">
        <div class="container px-5">
          <h1 class="fw-bolder fs-5 mb-4">Articles & Sermons</h1>
          <div class="card border-0 shadow rounded-3 overflow-hidden">
            <div class="card-body p-0">
              <div class="row gx-0">
                <div class="col-lg-6 col-xl-5 py-lg-5">
                  <div class="p-4 p-md-5">
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                      News
                    </div>
                    <div class="badge bg-primary m-2 bg-gradient rounded-pill mb-2">
                      Featured
                    </div>
                    {fetchedList && (
                      <div class="h2 fw-bolder">
                        {fetchedList[0]?.articleTitle}
                      </div>
                    )}
                    {fetchedList && (
                      <div
                        className="fs-5 mb-4"
                        dangerouslySetInnerHTML={{
                          __html:
                            fetchedList[0]?.content?.length > 100
                              ? fetchedList[0]?.content?.substr(0, 100) + "..."
                              : fetchedList[0]?.content ?? "",
                        }}
                      />
                    )}
                    {fetchedList && (
                      <span
                        class="stretched-link text-decoration-none text-primary"
                        onClick={() =>
                          navigate(`../articles/${fetchedList[0]?.id}`)
                        }
                      >
                        Read more
                        <i class="bi bi-arrow-right"></i>
                      </span>
                    )}
                  </div>
                </div>
                {fetchedList && (
                  <div class="col-lg-6 col-xl-7">
                    <div
                      class="bg-featured-blog"
                      style={{
                        backgroundImage: `url(${fetchedList[0]?.coverImage})`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Blog preview section--> */}
      <section class="py-5">
        <div class="container px-5">
          <h2 class="fw-bolder fs-5 mb-4">More Articles</h2>
          <div class="row gx-5">
            {fetchedList &&
              fetchedList?.map((post, key) => (
                <div class="col-lg-4 mb-5">
                  <div
                    key={key}
                    class="card h-100 shadow border-0"
                    onClick={() => navigate(`../articles/${post.id}`)}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "15rem",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      class="card-img-top"
                      src={post?.coverImage}
                      alt="..."
                    />
                    <div class="card-body p-4">
                      {post.tags?.map((tag, key) => (
                        <div
                          key={key}
                          class="badge bg-primary bg-gradient rounded-pill mb-2"
                        >
                          tag
                        </div>
                      ))}
                      <a
                        class="text-decoration-none link-dark stretched-link"
                        href="#!"
                      >
                        <div class="h5 card-title mb-3">
                          <b>{post.articleTitle}</b>
                        </div>
                      </a>
                      <div
                        className="card-text mb-0"
                        dangerouslySetInnerHTML={{
                          __html:
                            post?.content?.length > 100
                              ? post?.content?.substr(0, 100) + "..."
                              : post?.content ?? "",
                        }}
                      />
                    </div>
                    <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                      <div class="d-flex align-items-end justify-content-between">
                        <div class="d-flex align-items-center">
                          <img
                            style={{
                              width: "3rem",
                              height: "3rem",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            class="rounded-circle me-3"
                            src={
                              post.authorProfileUrl ??
                              "https://www.seekpng.com/png/detail/143-1435868_headshot-silhouette-person-placeholder.png"
                            }
                            alt="..."
                          />
                          <div class="small">
                            <div class="fw-bold">{post.authorName}</div>
                            <div class="text-muted">
                              {new Date(post.modifiedAt).toLocaleDateString(
                                "en-US"
                              )}{" "}
                              &middot; {estimateReadingTime(post.content)} read
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* <div class="text-end mb-5 mb-xl-0">
            <a class="text-decoration-none" href="#!">
              More stories
              <i class="bi bi-arrow-right"></i>
            </a>
          </div> */}
        </div>
      </section>

      {/* // <!-- Footer--> */}
      <footer class="bg-dark py-4 mt-auto">
        <div class="container px-5">
          <div class="row align-items-center justify-content-between flex-column flex-sm-row">
            <div class="col-auto">
              <div class="small m-0 text-white">
                Copyright &copy; Your Website 2023
              </div>
            </div>
            <div class="col-auto">
              <a class="link-light small" href="#!">
                Privacy
              </a>
              <span class="text-white mx-1">&middot;</span>
              <a class="link-light small" href="#!">
                Terms
              </a>
              <span class="text-white mx-1">&middot;</span>
              <a class="link-light small" href="#!">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default BlogGrid;
