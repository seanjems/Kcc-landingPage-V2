import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
const Bloglists = () => {
  const [article, setArticle] = useState();

  const { id } = useParams();
  console.log("🚀 ~ file: Blogsingle.js:9 ~ Bloglists ~ id:", id);
  useEffect(() => {
    fetchThree();
  }, []);

  const ArticleObj = {
    content: article?.content,
    coverImage: article?.coverImage,
    tags: article?.tags,
    authorId: 1,
    autherName: article?.authorName,
    articleTitle: article?.articleTitle,
    autherTitle: article?.authorTitle,
    authorProfileUrl:
      article?.authorProfileUrl ??
      "https://www.seekpng.com/png/detail/143-1435868_headshot-silhouette-person-placeholder.png",
  };
  const fetchThree = async () => {
    return fetch(
      // `${"https://api.kampalacentraladventist.org/"}api/YouTubeChannel/GetYoutubeVideos?page=1&pageSize=5`,
      `${"https://localhost:7204"}/api/Articles/${id}`,
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

        setArticle(data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  return (
    <>
      {article && (
        <section className="py-5">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-3">
                <div className="d-flex align-items-center mt-lg-5 mb-4">
                  <img
                    className="img-fluid rounded-circle"
                    src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="..."
                  />
                  <div className="ms-3">
                    <div className="fw-bold">
                      {ArticleObj?.autherName ?? ""}
                    </div>
                    <div className="text-muted">
                      {ArticleObj?.autherTitle ?? ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <article>
                  <header className="mb-4">
                    <h1 className="fw-bolder mb-1">
                      {ArticleObj?.articleTitle ?? ""}
                    </h1>
                    {/* <!-- Post meta content--> */}
                    <div className="text-muted fst-italic mb-2">{`${new Date(
                      article.modifiedAt
                    ).toLocaleDateString("en-US")} ${new Date(
                      article.modifiedAt
                    ).toLocaleTimeString("en-US", {
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}`}</div>
                    {/* <!-- Post categories--> */}
                    {ArticleObj?.tags &&
                      ArticleObj?.tags?.map((tag, key) => (
                        <a
                          key={key}
                          className="badge bg-secondary text-decoration-none link-light"
                          href="#!"
                          style={{ marginRight: "0.4rem" }}
                        >
                          {tag}
                        </a>
                      ))}
                  </header>
                  {/* <!-- Preview image figure--> */}
                  <figure className="mb-4">
                    <img
                      className="img-fluid rounded"
                      src={ArticleObj?.coverImage ?? ""}
                      alt="..."
                    />
                  </figure>
                  {/* <!-- Post content--> */}
                  <section className="mb-5">
                    <div
                      className="fs-5 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: ArticleObj?.content ?? "",
                      }}
                    />
                  </section>
                </article>
                {/* <!-- Comments section--> */}
                {/*  */}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-dark py-4 mt-auto">
        <div className="container px-5">
          <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto">
              <div className="small m-0 text-white">
                Copyright &copy; Kampala Central Adventist Church{" "}
                {new Date().getFullYear()}
              </div>
            </div>
            <div className="col-auto">
              <a className="link-light small" href="#!">
                Privacy
              </a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">
                Terms
              </a>
              <span className="text-white mx-1">&middot;</span>
              <a className="link-light small" href="#!">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Bloglists;
