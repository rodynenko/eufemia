import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import { SkeletonShow } from '../skeleton/Skeleton'
import { usePropsWithContext } from '../../shared/hooks'

// Internal
import TimelineItem, { TimelineItemProps } from './TimelineItem'

export * from './TimelineItem'

export interface TimelineProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /**
   * Pass in a list of your events as objects of timelineitem, to render them as timelineitems.
   * Default: null
   */
  data?: TimelineItemProps[]

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: TimelineItemProps[]
}

export const defaultProps = {
  className: null,
  skeleton: false,
  data: null,
  children: null,
}

const Timeline = (localProps: TimelineProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    className,
    skeleton,
    data,
    children: childrenItems,
    ...props
  } = usePropsWithContext(localProps, defaultProps, context?.Timeline)

  const spacingClasses = createSpacingClasses(props)

  return (
    <div
      className={classnames('dnb-timeline', spacingClasses, className)}
      data-testid="timeline"
      {...props}
    >
      {data?.map((timelineItem: TimelineItemProps) => (
        <TimelineItem
          key={timelineItem.name}
          skeleton={skeleton}
          {...timelineItem}
        />
      ))}

      {childrenItems}
    </div>
  )
}

Timeline.Item = TimelineItem

export { TimelineItem }

export default Timeline
