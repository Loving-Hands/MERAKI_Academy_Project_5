import React from "react";
import "./aboutUs.css";

export default function aboutUs() {
  return (
    <>
      <div className="aboutUsPage">
        <section className="text-center about">
          <h1>About US</h1>
          <div className="container">
            <div className="row">
              <div
                className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn"
                data-wow-offset={200}
              >
                <img
                  src="https://ca.slack-edge.com/T06CCT6GR0R-U06C108092P-779d2ca9fc9e-102"
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
                <h2>Mohammad</h2>
                <p className="lead">
                  Experienced web developer skilled in full-stack development
                  with Node.js and React.js. Strong background in computer
                  science, adept at building dynamic, responsive web
                  applications. Specializes in integrating RESTful APIs for
                  seamless backend-to-frontend communication, ensuring
                  high-quality solutions that meet client goals and enhance user
                  experiences.
                </p>
              </div>
              <div
                className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn"
                data-wow-offset={200}
              >
                <img
                  src="https://ca.slack-edge.com/T06CCT6GR0R-U06BY57RUH3-b42d8633773a-102"
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
                <h2>Ahmad </h2>
                <p className="lead">
                  Experienced web developer skilled in full-stack development
                  with Node.js and React.js. Strong background in computer
                  science, adept at building dynamic, responsive web
                  applications. Specializes in integrating RESTful APIs for
                  seamless backend-to-frontend communication, ensuring
                  high-quality solutions that meet client goals and enhance user
                  experiences.
                </p>
              </div>

              <div
                className="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn"
                data-wow-offset={200}
              >
                <img
                  src="https://ca.slack-edge.com/T06CCT6GR0R-U06CPAUDW8Y-d98cd193ab0f-102"
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
                <h2>Ghaidaa</h2>
                <p className="lead">
                  Experienced web developer skilled in full-stack development
                  with Node.js and React.js. Strong background in computer
                  science, adept at building dynamic, responsive web
                  applications. Specializes in integrating RESTful APIs for
                  seamless backend-to-frontend communication, ensuring
                  high-quality solutions that meet client goals and enhance user
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
