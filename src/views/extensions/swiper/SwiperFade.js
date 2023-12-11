import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import img1 from 'public/images/banner/banner-20.jpg'
import img2 from 'public/images/banner/banner-19.jpg'
import img3 from 'public/images/banner/banner-18.jpg'
import img4 from 'public/images/banner/banner-17.jpg'
import img5 from 'public/images/banner/banner-16.jpg'

const params = {
  effect: 'fade',
  navigation: true,
  pagination: {
    clickable: true
  }
}

const SwiperFade = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Fade</CardTitle>
      </CardHeader>
      <CardBody>
        <Swiper {...params}>
          <SwiperSlide>
            <img src='/images/banner/banner-20.jpg' alt='swiper 1' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='/images/banner/banner-20.jpg' alt='swiper 2' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='/images/banner/banner-20.jpg' alt='swiper 3' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='/images/banner/banner-20.jpg' alt='swiper 4' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='/images/banner/banner-20.jpg' alt='swiper 5' className='img-fluid' />
          </SwiperSlide>
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperFade
