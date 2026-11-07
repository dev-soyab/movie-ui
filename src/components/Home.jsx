import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Styles/Home.css"; // Import the CSS file for Home component
import { fetchMovies } from "../services/MovieService";
import Footer from "./Footer";

function Home({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    require(`../assets/slider-1.png`),
    require(`../assets/slider-2.png`),
    require(`../assets/slider-3.png`),
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleBookNowClick = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      <Navbar />
      {/* Slider Section */}
      <div className="slider">
        <img src={slides[currentIndex]} alt="Slider" className="slider-image" />
      </div>

      <div className="movie-section">
        {/* Movie cards */}
        <div className="movie-cards">
          {movies.map((movie) => (
            <div key={movie.movieId} className="movie-card">
              <img
                src={require(`../assets/movie-poster.png`)}
                alt={`${movie.title} poster`}
              />
              <h3 style={{ color: "#D89216" }}>
                <strong>{movie.title}</strong>
              </h3>
              <p>{movie.genre}</p>
              <p>{movie.description}</p>
              <p>Duration: {movie.duration} Mins</p>
              <p>
                <span className="fa fa-star" style={{ color: "red" }}></span>{" "}
                &nbsp; {movie.rating}/10
              </p>
              <button
                className="btn btn-primary mt-2 px-4"
                onClick={handleBookNowClick}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
