/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Input,
  // InputMasked,
  // Modal,
  Button,
  // FormSet,
  DatePicker,
  FormRow,
  ToggleButton,
  Skeleton
  // FormLabel
} from '../../src/components'
import { H1, H2, P, Ol, Li, Ul, Dl, Dt, Dd } from '../../src/elements'
import Provider from '../../src/shared/Provider'

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

const WidthLimit = styled(FormRow)`
  ${'' /* width: 10rem; */}
`

export default [
  'Skeleton',
  () => {
    // React.useEffect(() => {
    //   console.log('myRef', myRef.current)
    //   // console.log('myRef', Input, myRef.current)
    //   // myRef.current.focus()
    // })

    const [showSkeleton, setSkeletonState] = React.useState(true)
    // console.log('showSkeleton', showSkeleton)

    return (
      <Provider
        skeleton={showSkeleton}
        // formRow={{ skeleton: showSkeleton }}
      >
        <CustomStyle>
          <Wrapper>
            <Box>
              <ToggleButton
                skeleton={false}
                checked={showSkeleton}
                on_change={() => setSkeletonState((s) => !s)}
              >
                Toggle Skeleton
              </ToggleButton>
              <Button>Button</Button>
              <H1 top bottom>
                Big heading
              </H1>
              {/* <P top bottom>
                Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                dui.
              </P> */}
              {/* <Input label_direction="vertical" label="Input" /> */}
            </Box>

            <Box>
              <DatePicker />
              <DatePicker show_input />
            </Box>

            <Box>
              <WidthLimit vertical>
                {/* <div className="dnb-skeleton dnb-h--large">y</div> */}
                <H2>H2</H2>
                <P top>
                  Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                  dui varius per nullam vel consectetur malesuada platea
                  molestie semper consequat commodo urna
                </P>
                <Input top label="Input" />
                <Input
                  top
                  label="Input"
                  size="medium"
                  value="Value"
                  icon="calendar"
                  align="right"
                />
                <Input
                  top
                  label="Input"
                  size="large"
                  placeholder="Placeholder"
                  icon_position="right"
                  icon="calendar"
                  align="right"
                />
                <Skeleton top className="dnb-h--xx-large" width={20}>
                  {/* x */}
                </Skeleton>
                <Skeleton top className="dnb-p" width={20} />
                <Skeleton top figure="article" />
                {/* <Skeleton show top>
                  <P>Paragraph</P>
                </Skeleton> */}
              </WidthLimit>
            </Box>

            <Box>
              <Ul>
                <Li>Item 1</Li>
                <Li>Item 2</Li>
                <Li>
                  Item 3
                  <Ul>
                    <Li>
                      Item 1 <br />
                      Break with a{' '}
                      <a className="dnb-anchor" href="/">
                        Anchor (Text Link
                      </a>
                    </Li>
                    <Li>Item 2</Li>
                  </Ul>
                </Li>
                <Li>Item 4</Li>
              </Ul>
            </Box>
            <Box>
              <Ol nested>
                <Li>Item</Li>
                <Li>
                  Item
                  <Ol>
                    <Li>
                      Item
                      <Ol>
                        <Li>Item</Li>
                        <Li>Item</Li>
                      </Ol>
                    </Li>
                    <Li>
                      Item
                      <Ol>
                        <Li>Item</Li>
                        <Li>Item</Li>
                      </Ol>
                    </Li>
                  </Ol>
                </Li>
                <Li>Item</Li>
              </Ol>
            </Box>
            <Box>
              <ListWidthLimit>
                <Ol nested className="dnb-ol--outside">
                  <Li>
                    Using <code className="dnb-code">dnb-ol--outside</code>{' '}
                    (default): Using Porta commodo tempus interdum habitant
                    urna magna aliquet quam nisl
                    <Ol>
                      <Li>
                        Porta commodo tempus interdum habitant urna magna
                        aliquet quam nisl
                      </Li>
                    </Ol>
                  </Li>
                </Ol>
                <Ol nested className="dnb-ol--inside">
                  <Li>
                    New ol, using{' '}
                    <code className="dnb-code">dnb-ol--inside</code>: Porta
                    commodo tempus interdum habitant urna magna aliquet
                    quam nisl
                    <Ol>
                      <Li>
                        Porta commodo tempus interdum habitant urna magna
                        aliquet quam nisl
                      </Li>
                    </Ol>
                  </Li>
                </Ol>
              </ListWidthLimit>
            </Box>
            <Box>
              <Dl>
                <Dt>Term</Dt>
                <Dd>Description</Dd>
                <Dt>Term</Dt>
                <Dd>Description 1</Dd>
                <Dd>Description 2</Dd>
                <Dd>Description 3</Dd>
                <dl className="dnb-dl">
                  <Dt>Sub Term</Dt>
                  <Dd>Sub Description</Dd>
                </dl>
              </Dl>
            </Box>
          </Wrapper>
        </CustomStyle>
        end
      </Provider>
    )
  }
]

const ListWidthLimit = styled.div`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
`
