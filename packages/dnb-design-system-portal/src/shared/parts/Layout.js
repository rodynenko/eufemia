/**
 * Page Component
 *
 */

// UI Style
import 'dnb-ui-lib/src/style/patterns' // import ony patterns
import 'dnb-ui-lib/src/style' // import both all components and the default theme
// import 'dnb-ui-lib/src/patterns/article/style'
// import 'dnb-ui-lib/src/style/themes/dnb-theme-open-banking.scss'

import { pageFocus } from 'dnb-ui-lib/src/shared/tools'
import React, { PureComponent } from 'react'
import { Link } from 'gatsby'

import PropTypes from 'prop-types'
import Sidebar from '../menu/SidebarMenu'
import StickyMenuBar from '../menu/StickyMenuBar'
import { markdownStyle } from './Markdown'
import styled, { cx } from 'react-emotion'
import { buildVersion } from '../../../package.json'
import { SidebarMenuProvider } from '../menu/SidebarMenuContext'

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    header: PropTypes.string
  }
  static defaultProps = {
    header: null
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  componentDidMount() {
    pageFocus(this._ref.current)
  }

  render() {
    const { children, location, header = null } = this.props

    if (/fullscreen/.test(location.search)) {
      return (
        <div className="is-fullscreen">
          {/* Load the StickyMenuBar to make use of the grid demo */}
          <StickyMenuBar preventBarVisibility={true} />
          <Content
            tabIndex="-1"
            className="fullscreen-page"
            innerRef={this._ref}
          >
            <MaxWidth className="dnb-page-content-inner">
              {children}
            </MaxWidth>
          </Content>
          <Footer />
        </div>
      )
    }

    return (
      <SidebarMenuProvider>
        <StickyMenuBar header={header} />
        <Wrapper>
          <Sidebar location={location} showAll={false} />
          <Content tabIndex="-1" innerRef={this._ref}>
            <MaxWidth className="dnb-page-content-inner">
              {children}
              <Footer />
            </MaxWidth>
          </Content>
        </Wrapper>
      </SidebarMenuProvider>
    )
  }
}

export default Layout

const Wrapper = styled.div`
  position: relative;
  z-index: 2; /* one less than "is-overlay" */
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 50rem) {
    display: block;
  }
`

const Content = ({ className, children }) => (
  <Main
    className={cx(
      'dnb-style',
      'dnb-page-content',
      'dnb-no-focus',
      className,
      markdownStyle
    )}
  >
    {children}
  </Main>
)
Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Content.defaultProps = {
  className: null
}

const Main = styled.main`
  position: relative;
  z-index: 2; /* heigher than styled.aside */

  display: flex;
  flex-grow: 1;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
  overflow: visible;

  margin-top: calc(
    4rem - 0.0625rem
  ); /* height of StickyMenuBar - 1px border */
  margin-left: 30vw; /* 30vw, width of Sidebar aside */
  margin-left: var(--aside-width);
  padding: 1rem 0 2rem 0;

  background-color: #fff;
  border-top: 1px solid var(--color-outline-grey);
  border-left: 1px solid var(--color-outline-grey);

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media only screen and (max-width: 50rem) {
    margin-left: 0;
  }

  &.fullscreen-page {
    margin: 0;
    border: none;

    /* markdown / mdx empty div */
    ${'' /* div:not([class]):first-child {
    } */};
  }
`

const MaxWidth = styled.div`
  max-width: 100%;
  width: 50vw;
  padding: 0 2rem;

  @media only screen and (max-width: 120rem) {
    width: 100%;
    position: relative;
  }
`

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2; /* 1 heigher than aside */

  margin-top: 3rem;
  padding: 1rem 0;

  border-top: 1px solid var(--color-outline-grey);
  text-align: left;

  .is-fullscreen & {
    padding: 1rem;
    background: var(--color-sea-green-4);
  }

  a {
    font-size: 0.7rem;
    margin-right: 1rem;
  }
`
const Footer = () => (
  <FooterWrapper>
    <Link to="/license" className="no-underline">
      Copyright (c) 2018-present DNB.no
    </Link>
    <Link to="/log" className="no-underline">
      {buildVersion}
    </Link>
  </FooterWrapper>
)
