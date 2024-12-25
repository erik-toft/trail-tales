"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import styles from "./Slideshow.module.css";
import { Image } from "@/types/Pin.types";
import { FaPause, FaPlay } from "react-icons/fa";
import { Swiper as SwiperType } from "swiper/types";

interface SlideshowProps {
  currentImages: Image[];
  year?: number;
  title: string;
}

const Slideshow: React.FC<SlideshowProps> = ({
  currentImages,
  title,
  year,
}) => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleStartSlideshow = () => {
    setShowSlideshow(true);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
  };

  const handlePause = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    }
  };

  const handleStart = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {currentImages.length !== 0 && !showSlideshow && (
        <button className={styles.startButton} onClick={handleStartSlideshow}>
          Slideshow
        </button>
      )}

      {showSlideshow && (
        <div className={styles.modalOverlay} onClick={handleCloseSlideshow}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={handleCloseSlideshow}
            >
              X
            </button>
            <span>
              {title} {year}
            </span>
            <div className={styles.controls}>
              <button onClick={() => handlePause()} disabled={!isPlaying}>
                <FaPause />
              </button>
              <button onClick={() => handleStart()} disabled={isPlaying}>
                <FaPlay />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
            >
              {currentImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.imageContainer}>
                    <img
                      src={image.url}
                      alt={image.name}
                      className={styles.image}
                    />
                    {image.comment && (
                      <p className={styles.comment}>{image.comment}</p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
