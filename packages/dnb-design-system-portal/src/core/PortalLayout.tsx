/* eslint-disable react/prop-types */
/**
 * MDX Template
 */

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../shared/parts/Layout'
import Tabbar from '../shared/tags/Tabbar'
import tags from '../shared/tags'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { setPortalHeadData, usePortalHead } from './PortalHead'

const ContentWrapper = Tabbar.ContentWrapper

export default function PortalLayout(props) {
  const { pageContext, location, children } = props

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              fullscreen
              showTabs
              hideTabs {
                title
              }
              tabs {
                title
                key
              }
            }
            siblings {
              fields {
                slug
              }
              frontmatter {
                menuTitle
                title
                description
                fullscreen
                showTabs
                hideTabs {
                  title
                }
                tabs {
                  title
                  key
                }
              }
            }
          }
        }
      }
    }
  `)

  const slug = location.pathname.replace(/^\/|\/$/g, '')
  const mdx =
    React.useMemo(() => {
      return data.allMdx.edges.find(({ node }) => {
        return slug === node.fields.slug
      })
    }, [data, slug])?.node || {}

  const { siblings } = mdx
  const category = siblings?.[0]
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}
  const fmData = Object.entries(categoryFm).reduce(
    (acc, [key, value]) => {
      if (!acc[key]) {
        acc[key] = value
      }
      return acc
    },
    { ...currentFm }
  )

  // Ensure heading levels are reset before each page renders
  resetLevels(1)

  usePortalHead(fmData)

  if (!mdx?.frontmatter) {
    return children // looks like it was not a MDX, so we just return children
  }

  const Content = () => {
    if (currentFm.showTabs) {
      resetLevels(2)
    }

    return (
      <ContentWrapper>
        <MDXProvider components={tags}>{children}</MDXProvider>
      </ContentWrapper>
    )
  }

  // Share frontmatter in pageContext during SSR/SSG
  if (pageContext?.frontmatter) {
    setPortalHeadData(pageContext, fmData)
  }

  const makeUseOfCategory = Boolean(
    !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs
  )
  const rootPath =
    '/' + (makeUseOfCategory ? category?.fields?.slug : mdx?.fields?.slug)
  const fullscreen = Boolean(fmData?.fullscreen) || pageContext?.fullscreen

  return (
    <Layout key="layout" location={location} fullscreen={fullscreen}>
      {currentFm.showTabs && (
        <Tabbar
          key="tabbar"
          location={location}
          rootPath={rootPath}
          title={fmData.title}
          tabs={fmData.tabs}
          defaultTabs={fmData.defaultTabs}
          hideTabs={fmData.hideTabs}
        />
      )}

      <Content />
    </Layout>
  )
}