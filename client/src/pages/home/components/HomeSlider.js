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
				loop={true}
				spaceBetween={16 * 4}
				modules={[Pagination]}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="/images/slide_1.png" alt="slide" />
						<span>Keep track of your expenses</span>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="/images/slide_2.png" alt="slide" />
						<span>Categorize them as you like</span>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}>
						<img src="/images/slide_3.png" alt="slide" />
						<span>And be aware of where you spend most of your money</span>
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default HomeSlider;
