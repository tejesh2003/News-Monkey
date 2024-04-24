import React from "react";

const NewsItem = (props) => {
  let { mode, title, description, ImageUrl, NewsUrl, author, date, source } = props;
  return (
    <div className="container d-flex justify-content-between my-3">
      <div className={`card text-${mode === "primary" ? "dark" : "light"} border-0`} style={{ width: "21rem", height:"30rem", position: "relative" }}>
        <span className={`badge bg-${mode === "dark" ? "dark" : "primary"}`} style={{ position: "absolute", width: "21rem" }}>
          {source}
        </span>
        <img
          src={ImageUrl}
          className="card-img-top"
          alt="..."
          style={{ height: "12rem", width: "100%", objectFit: "cover" }}
        />
        <div className={`card-body bg-${mode === "primary" ? "light" : "dark"} p-0`} style={{ height: "calc(100% - 12rem)" }}>
          <h5 className="card-title p-2">{title}...</h5>
          <p className="card-text p-2">{description !== "" ? description + "..." : ""}</p>
          <p className="card-text p-2">
            <small className={`text-${mode === "primary" ? "danger" : "light"}`}>
              By {!author ? "Unkown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={NewsUrl}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-sm btn-${mode === "primary" ? "primary" : "light"} mx-2`}
            style={{ position: "absolute", bottom: "10px"}}
          >
            Read more...
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
