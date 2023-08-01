import { mountSuspended } from 'nuxt-vitest/utils'

import Slider from '@/components/BannerSlider/index.vue'
import SliderBg from '@/components/BannerSlider/Bg.vue'

describe('Banner Slider Component', async () => {

  it('renders components instances', async () => { 
    const sliderWrapper =  await mountSuspended(Slider)
    const sliderBgWrapper =  await mountSuspended(SliderBg)
    expect(sliderWrapper.vm).toBeTruthy() 
    expect(sliderBgWrapper.vm).toBeTruthy()
  })
})
