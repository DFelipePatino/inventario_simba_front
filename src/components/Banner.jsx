import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';

const Banner = () => {
    const items = [
        {
            image: "/bannerInventario1.png",
        },
        {
            image: "/bannerInventario2.png",
        },
        {
            image: "/bannerInventario3.png",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} className="blur-bottom" style={{ width: '100%', height: '300px' }}>

                        <img src={item.image} alt="banner" style={{ width: '100%', height: '200vh' }} />

                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;