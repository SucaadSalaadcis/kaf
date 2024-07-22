import Slider from '../../components/Slider'
import CarouselPicture from '../../components/CarouselPicture'
import Features from '../features/Features'

function Home() {
  return (
    <>
      <Slider />
      <CarouselPicture heading="All The Products" />
      <Features/>
    </>
  )
}

export default Home