import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
            At Eatry, we're on a mission to redefine the way you experience food. Our story began with a simple yet bold idea: to create a space where people could come together to savor delicious flavors, share laughter, and make unforgettable memories.
            Inspired by the rich culinary heritage of our community, our chefs craft innovative dishes that blend traditional flavors with modern twists. From farm-to-table produce to carefully selected ingredients, we're committed to serving only the freshest and highest-quality food that will delight your taste buds.
            </p>
            <Link to={"/"}>
              Explore {" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
