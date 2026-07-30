import HeroLongevity from '@/components/longevity/HeroLongevity'
import LongevityContent from '@/components/longevity/LongevityContent'
import LongevityCta from '@/components/longevity/LongevityCta'
import React from 'react'
  
const LongevityPage = () => {
  return (
    <>
      <HeroLongevity />
      <LongevityContent />
      
      <LongevityCta />
    </>
  )
}

export default LongevityPage