import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import reviewImage from "../../images/review.jpg";
import avatar from "../../images/avatar.png";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function Reviews() {
  const icons = {
    star: {
      complete: faStar,
      half: faStarHalfAlt,
      empty: farStar,
    },
  };

  const colors = {
    star: ["#d9ad26", "#d9ad26", "#434b4d"],
  };

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/review")
      .then(function (response) {
        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>
        <span className='heading-text'>Customers</span> Thoughts
      </h1>
      <div
        className='container my-5'
        style={{ backgroundColor: "rgb(236, 54, 109)", color: "white" }}
      >
        <div className='row align-items-center' style={{ height: "350px" }}>
          <div className='col-12 col-md-6'>
            <Carousel indicators={false}>
              {reviews.map((review) => (
                <Carousel.Item key={review._id}>
                  <div style={{ height: "100px" }}>
                    <img
                      src={avatar}
                      alt=''
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      className='mb-3'
                    />
                  </div>
                  <div style={{ height: "auto" }} className='mt-3'>
                    <PrettyRating
                      value={review.rating}
                      icons={icons.star}
                      colors={colors.star}
                      max={5}
                    />
                    <p className='mt-3'>
                      {" "}
                      <RiDoubleQuotesL /> {review.review} <RiDoubleQuotesR />
                    </p>
                    <h6>- {review.username}</h6>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div
            className='d-none d-md-block col-md-6'
            style={{ padding: "0px 0px" }}
          >
            <img
              src={reviewImage}
              alt=''
              style={{
                height: "350px",
                width: "100%",
                padding: "0px 0px 0px 0px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
