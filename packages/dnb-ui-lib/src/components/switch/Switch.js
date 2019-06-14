/**
 * Web Switch Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  label: PropTypes.string,
  label_position: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string,
  default_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  value: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  label: null,
  label_position: 'left',
  title: null,
  default_state: null,
  checked: 'default', //we have to send this as a string
  disabled: null,
  id: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  value: null,
  attributes: null,
  readOnly: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The switch component is our enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
 */
export default class Switch extends Component {
  static tagName = 'dnb-switch'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Switch.tagName, Switch, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (state.hasDefaultState) {
        state.checked = Switch.parseChecked(props.default_state)
        state.hasDefaultState = false
      } else if (props.checked !== 'default') {
        state.checked = Switch.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || `dnb-switch-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
      hasDefaultState: props.default_state !== null,
      checked: Switch.parseChecked(props.default_state || props.checked)
    }
    this.helperParams = { onMouseDown: e => e.preventDefault() }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      Switch.parseChecked(this.props.checked) !==
      Switch.parseChecked(nextProps.checked)
    ) {
      const { checked } = nextState
      dispatchCustomElementEvent(this, 'on_state_update', { checked })
    }
    return true
  }

  onKeyDownHandler = event => {
    switch (keycode(event)) {
      case 'enter':
        this.onChangeHandler(event)
        break
    }
  }

  onChangeHandler = event => {
    if (String(this.props.readOnly) === 'true') {
      return event.preventDefault()
    }
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  onMouseOutHandler = () => {
    // this way we keep the new state after the user changed the state, without getting the error state back vissually
    if (this.props.status && this.props.status_state === 'error') {
      return
    }
    if (this._refInput.current) {
      this._refInput.current.blur()
    }
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      value,
      status,
      status_state,
      status_animation,
      label,
      label_position,
      title,
      disabled,
      readOnly,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      default_state: _default_state, // eslint-disable-line
      checked: _checked, // eslint-disable-line
      attributes, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      on_state_update, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = props

    const { checked } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'
    const hasStatusMessage = showStatus && status !== 'info'

    const classes = classnames(
      'dnb-switch',
      status && `dnb-switch__status--${status_state}`,
      className,
      _className
    )

    const inputParams = {
      disabled: isTrue(disabled),
      checked,
      onMouseOut: this.onMouseOutHandler, // for resetting the button to the default state
      ...rest
    }

    if (showStatus) {
      inputParams['aria-describedby'] = id + '-status'
    }
    if (label) {
      inputParams['aria-labelledby'] = id + '-label'
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    const statusComp = showStatus && (
      <FormStatus
        text={status}
        status={status_state}
        text_id={id + '-status'} // used for "aria-describedby"
        animation={status_animation}
      />
    )

    return (
      <>
        <span
          className={classnames(
            label &&
              label_position &&
              `dnb-switch--label-position-${label_position}`,
            hasStatusMessage && `dnb-switch__status--message`
          )}
        >
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              disabled={disabled}
            />
          )}
          <span className={classes}>
            <span className="dnb-switch__shell">
              <input
                id={id}
                name={id}
                type="checkbox"
                role="switch"
                title={title}
                aria-checked={checked}
                className="dnb-switch__input"
                value={checked ? value || '' : ''}
                ref={this._refInput}
                {...inputParams}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
              />
              <span
                draggable
                aria-hidden
                className="dnb-switch__background"
                onDragStart={this.onChangeHandler}
                {...this.helperParams}
              />
              <span aria-hidden className="dnb-switch__button">
                <span className="dnb-switch__focus">
                  <span className="dnb-switch__focus__inner" />
                </span>
              </span>
            </span>
            {label_position === 'left' && statusComp}
          </span>
        </span>
        {label_position === 'right' && statusComp}
      </>
    )
  }
}
