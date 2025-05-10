import type { ComponentProps } from 'react'

import MediumZoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

export function ZoomImage({ children }: ComponentProps<'div'>) {
  return (
    <MediumZoom zoomMargin={80} classDialog="zoom-image">
      {children}
    </MediumZoom>
  )
}
