import Head from "next/head";
import { Navbar } from "../components";
import React, { useEffect, useState } from "react";
import { Calendar, Star1 } from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Home = ({ movies }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const posterImgBaseUrl = "https://image.tmdb.org/t/p/w500/";
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundImg = imageBaseUrl + movies[currentIndex].backdrop_path;
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="h-screen py-2 app md:px-32 px-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${backgroundImg})`,
      }}
    >
      <Head>
        <title>Next Movie</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <main className="w-full  text-white font-oswald">
        <div className="md:pr-96 md:mt-10 mt-5 space-y-5">
          <h3 className="font-bold nd:text-5xl text-2xl uppercase">
            {movies[currentIndex].title}
          </h3>
          <p className="text-lg font-light">{movies[currentIndex].overview}</p>
          <div className="flex items-center space-x-10">
            <p className="flex items-center space-x-5">
              <Calendar size="32" color="#fff" variant="Bulk" />
              <span>{movies[currentIndex].release_date}</span>
            </p>
            <p className="flex items-center space-x-5">
              <Star1 size="32" color="#fff" variant="Bulk" />
              <span>{movies[currentIndex].vote_average}/10</span>
            </p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 p-3 mt-5">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {movies.map((movie, index) => (
              <SwiperSlide>
                <div key={movie.id} onClick={() => handleClick(index)}>
                  <img
                    src={posterImgBaseUrl + movie.poster_path}
                    alt=""
                    className="rounded-md cursor-pointer transition duration-300 hover:border-2 hover:-translate-y-2"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const apiKey = process.env.NEXT_TMDB_API;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  const movies = data.results;

  return {
    props: {
      movies,
    },
  };
}
