const rollup = require('rollup')
const commonJs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')
const buble = require('rollup-plugin-buble')
const fs = require('fs-extra')
const path = require('path')

const tmp = '_dist'
const target = 'docs'

fs.removeSync(tmp)
fs.ensureDirSync(tmp)
fs.copySync('assets', tmp)

rollup.rollup({
  input: 'src/index.js',
  plugins: [
    { load: x => x === './dev.js' ? '' : null },
    nodeResolve(),
    commonJs(),
    buble({
      transforms: {
        dangerousTaggedTemplateString: true
      },
      objectAssign: 'Object.assign'
    }),
    uglify.uglify({ mangle: true, compress: true }),
    filesize()
  ]
})
.then(bundle =>
  bundle.write({
    file: path.join(tmp, '/index.js'),
    format: 'iife',
    sourcemap: true
  })
)
.then(() => {
  fs.moveSync(tmp, target, { overwrite: true })
  fs.writeFileSync(
    path.join(target, 'index.html'),
    fs.readFileSync(path.join(target, 'index.html'), 'utf8')
      .replace(' type="module"', '')
  )
})
.catch(console.error)
