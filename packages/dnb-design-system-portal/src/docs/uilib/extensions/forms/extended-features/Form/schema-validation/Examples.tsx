import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card, Flex } from '@dnb/eufemia/src'
import { Form, Field, Iterate } from '@dnb/eufemia/src/extensions/forms'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const SingleFieldSchema = () => {
  return (
    <ComponentBox>
      <Field.String schema={{ type: 'string', minLength: 5 }} />
    </ComponentBox>
  )
}

export const DataSetSchema = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          address: 'Prefilled address',
        }}
        schema={{
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2 },
            address: { type: 'string', minLength: 3 },
          },
          required: ['name', 'address'],
        }}
      >
        <Card spacing="small" bottom="small">
          <Form.MainHeading>Company information</Form.MainHeading>

          <Field.String path="/name" label="Name" />
          <Field.String path="/address" label="Address" />
        </Card>

        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const IfRuleSchema = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{}}
        schema={{
          type: 'object',
          properties: {
            name: { type: 'string' },
            customerType: {
              type: 'string',
              enum: ['corporate', 'private'],
            },
            companyName: { type: 'string' },
          },
          if: {
            properties: { customerType: { enum: ['corporate'] } },
            required: ['customerType'],
          },
          then: { required: ['name', 'companyName'] },
          else: { required: ['name'] },
        }}
      >
        <Card spacing="small" bottom="small">
          <Form.MainHeading>Customer information</Form.MainHeading>

          <Field.String path="/name" label="Name" />
          <Field.String
            path="/customerType"
            label="Customer type (corporate or private)"
          />
          <Field.String
            path="/companyName"
            label="Company name (required for corporate customers)"
          />
        </Card>

        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const DependantListSchema = () => {
  return (
    <ComponentBox scope={{ Iterate, TrashIcon }}>
      <Form.Handler
        data={{
          accounts: [{}],
        }}
        schema={{
          type: 'object',
          definitions: {
            account: {
              type: 'object',
              properties: {
                accountNumber: {
                  type: 'string',
                  pattern: '^[0-9]{11}$',
                },
                alias: {
                  type: 'string',
                  minLength: 2,
                  maxLength: 32,
                },
              },
              required: ['accountNumber'],
            },
          },
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            accounts: {
              type: 'array',
              items: {
                $ref: '#/definitions/account',
              },
            },
            bsuAccount: {
              $ref: '#/definitions/account',
            },
          },
          oneOf: [
            {
              properties: {
                accounts: {
                  type: 'array',
                  minItems: 1,
                },
              },
            },
            {
              properties: {
                accounts: {
                  type: 'array',
                  minItems: 0,
                },
                bsuAccount: {
                  type: 'object',
                  required: ['accountNumber'],
                },
              },
              required: ['bsuAccount'],
            },
          ],
        }}
      >
        <Flex.Vertical spacing="small">
          <Form.MainHeading>Customer information</Form.MainHeading>
          <Card spacing="small">
            <Field.String path="/name" label="Name" />
            <Field.Email path="/email" label="E-mail" />
            <Field.PhoneNumber path="/phone" label="Phone number" />
          </Card>

          <Form.MainHeading>Accounts</Form.MainHeading>
          <Card spacing="small">
            <Form.SubHeading>Standard accounts</Form.SubHeading>

            <Iterate.Array path="/accounts">
              <Flex.Horizontal align="flex-end">
                <Field.BankAccountNumber
                  itemPath="/accountNumber"
                  label="Account number"
                />
                <Field.String
                  itemPath="/alias"
                  label="Alias"
                  width="medium"
                />
                <Iterate.ArrayRemoveElementButton icon={TrashIcon} />
              </Flex.Horizontal>
            </Iterate.Array>

            <Iterate.ArrayPushButton
              icon="add"
              icon_position="left"
              text="Add account"
              path="/accounts"
              pushValue={{}}
              size="medium"
            />

            <Form.SubHeading>BSU Account</Form.SubHeading>
            <Field.BankAccountNumber
              path="/bsuAccount/accountNumber"
              label="Account number"
            />
            <Field.String path="/bsuAccount/alias" label="Alias" />
          </Card>

          <Form.SubmitButton />
        </Flex.Vertical>
      </Form.Handler>
    </ComponentBox>
  )
}
