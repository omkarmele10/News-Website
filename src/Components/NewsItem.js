import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="col">
        <div className="card m-3 h-100 position-relative" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger m-1">
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "unkown" : author} on{" "}
                {new Date(date).toUTCString()}{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;



// import React, { Component } from "react";

// export class NewsItem extends Component {
//   render() {
//     let { title, description, imageUrl, newsUrl, author, date, source } =
//       this.props;

//     return (
//       <div className="col d-flex">
//         <div
//           className="card m-3 h-100 d-flex flex-column"
//           style={{ width: "18rem" }}
//         >
//           <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger m-1">
//             {source}
//           </span>

//           <img
//             src={imageUrl}
//             className="card-img-top"
//             alt="..."
//             style={{ height: "180px", objectFit: "cover" }}
//           />

//           <div className="card-body d-flex flex-column">
//             <h5 className="card-title">{title}...</h5>

//             <p className="card-text">{description}...</p>

//             <p className="card-text">
//               <small className="text-body-secondary">
//                 By {!author ? "unknown" : author} on{" "}
//                 {new Date(date).toUTCString()}
//               </small>
//             </p>

//             {/* Push button to bottom */}
//             <a
//               href={newsUrl}
//               rel="noreferrer"
//               target="_blank"
//               className="btn btn-primary mt-auto"
//             >
//               Read More
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItem;