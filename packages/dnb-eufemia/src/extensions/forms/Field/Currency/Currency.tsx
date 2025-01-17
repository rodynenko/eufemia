import React from 'react'
import classnames from 'classnames'
import { Context } from '../../../../shared'
import { getCurrencySymbol } from '../../../../components/number-format/NumberUtils'
import { CURRENCY } from '../../../../shared/defaults'
import NumberComponent, { Props as NumberProps } from '../Number'

export type Props = NumberProps

function Currency(props: Props) {
  const context = React.useContext(Context)
  const preparedProps = {
    ...props,
    currency: props.currency ?? CURRENCY,
    placeholder:
      props.placeholder ??
      getCurrencySymbol(context?.locale, props.currency),
  }

  return (
    <NumberComponent
      {...preparedProps}
      className={classnames('dnb-forms-field-currency', props.className)}
    />
  )
}

Currency._supportsSpacingProps = true
export default Currency
