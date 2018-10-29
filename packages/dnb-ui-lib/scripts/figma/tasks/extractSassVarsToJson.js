/**
 * Task
 *
 */

import path from 'path'
import fs from 'fs-extra'
import { parse as parseSass } from 'sass-variable-parser'

export const extractSassVars = async ({
  file,
  imports = ['./style/component/core-imports'],
  replaceCallback = null,
  parserOpts = {}
}) => {
  const filePath = path.resolve(__dirname, '../../../', file)
  let scssContent = await fs.readFile(filePath)

  if (typeof replaceCallback === 'function')
    scssContent = replaceCallback(scssContent)

  imports = imports.map(importStr => `@import '${importStr}';\n`)
  const vars = parseSass(
    `
      ${imports}
      ${scssContent}
    `,
    {
      camelCase: false,
      cwd: path.resolve(__dirname, '../../../src'),
      indented: false,
      ...parserOpts
    }
  )
  // we only reset the cwd, as this looks like bug in sass-variable-parser
  parseSass('', {
    cwd: process.env.ROOT_DIR
  })

  return Promise.resolve(vars)
}
