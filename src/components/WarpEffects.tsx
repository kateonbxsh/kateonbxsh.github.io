import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import React from 'react'

const WarpEffects: React.FC = () => {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.35}
      />
      <ChromaticAberration offset={[0.00012, 0.00003]} radialModulation modulationOffset={0.2} />
      <Noise opacity={0.012} premultiply />
      <Vignette eskil={false} offset={0.28} darkness={0.38} />
    </EffectComposer>
  )
}

export default WarpEffects
