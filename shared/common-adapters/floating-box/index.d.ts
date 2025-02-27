import * as React from 'react'
import {StylesCrossPlatform} from '../../styles/css'
import {Position} from '../../styles'

// GatewayDests:
// popup-root: At the root of the app. Sibling to root route renderer.

export type Props = {
  children?: React.ReactNode
  // Desktop only - will be triggered automatically only on click outside the box
  onHidden?: () => void
  // Desktop only - the node that we should aim for
  // optional because desktop only, return val nullable because refs always are
  attachTo?: () => React.ReactInstance | null
  // Desktop only - allow clicks outside the floating box to propagate. On
  // mobile you can control this by setting a margin in `containerStyle`.
  propagateOutsideClicks?: boolean
  containerStyle?: StylesCrossPlatform
  matchDimension?: boolean
  remeasureHint?: number
  position?: Position
  positionFallbacks?: Position[]
  hideKeyboard?: boolean // if true, hide the keyboard on mount
}
declare class FloatingBox extends React.Component<Props> {}
export default FloatingBox
