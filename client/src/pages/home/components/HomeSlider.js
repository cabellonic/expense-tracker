import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Styles
import styles from "./HomeSlider.module.css";

const HomeSlider = () => {
	return (
		<section>
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="https://via.placeholder.com/300x300" alt="slide" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="https://via.placeholder.com/300x300" alt="slide" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="https://via.placeholder.com/300x300" alt="slide" />
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default HomeSlider;
