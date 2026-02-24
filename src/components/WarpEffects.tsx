import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import React from 'react'

interface WarpEffectsProps {
  active: boolean
}

const WarpEffects: React.FC<WarpEffectsProps> = ({ active }) => {
  const bloomIntensity = active ? 0.45 : 0.3
  const luminanceThreshold = active ? 0.26 : 0.3
  const aberrationOffset: [number, number] = active ? [0.00045, 0.00012] : [0.00012, 0.00003]
  const noiseOpacity = active ? 0.022 : 0.012
  const vignetteDarkness = active ? 0.44 : 0.38

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.35}
      />
      <ChromaticAberration offset={aberrationOffset} radialModulation modulationOffset={0.2} />
      <Noise opacity={noiseOpacity} premultiply />
      <Vignette eskil={false} offset={0.28} darkness={vignetteDarkness} />
    </EffectComposer>
  )
}

export default WarpEffects
