/**
 * CLI Commands
 *
 */

// Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = 'production'
// process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// const argv = process.argv.slice(3)

import { runPrepublishTasks } from '../prepub/index'
runPrepublishTasks({ preventDelete: false })
