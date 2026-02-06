import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import SpaceScene from './SpaceScene'

export default function CanvasWrapper() {
  const { active } = useProgress()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      // small delay so loader fade feels natural
      const t = setTimeout(() => setVisible(true), 200)
      return () => clearTimeout(t)
    }
  }, [active])

  return (
    <div className={`canvas-fade ${visible ? 'show' : ''}`}>
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
