import { Fragment } from 'react'
import useOverlayStore from 'store/useOverlayStore'

const OverlayRoot = () => {
  const { overlays } = useOverlayStore((state)=>state)


  return (
    <>
    {[...overlays.entries()].map(([id, element]) => (
          <Fragment key={id}>{element}</Fragment>
        ))}
    </>
  )
}

export default OverlayRoot