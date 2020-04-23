import './dev.js'
import './style.js'

import m from 'mithril'
import stream from 'mithril-stream'

const p = console.log

window.addEventListener('resize', m.redraw)
window.addEventListener('orientationchange', m.redraw)

const tags = stream(initialState)
tags.map(setHash)
tags.map(m.redraw)
window.tags = tags

const debounce = (func, delay) => {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, arguments), delay)
  }
}

const events = ['click', 'keydown', 'touchstart']
events.map((evt) =>
  window.addEventListener(evt, debounce(m.redraw, 300) , true)
)

const Editor = () => ({
  view : () =>
    m('p',
      tags().map((tag, i) =>
        m('', { key: i },
          Object.entries(tag).map((keyVal, ind) => [
              m('input', { value : keyVal[0], oninput : (e) => keyVal[0] = e.target.value.trim() }),
              m('input', { value : keyVal[1], oninput : (e) => keyVal[1] = e.target.value.trim() }),
            ]
          ),
          m('button', { onclick : () => tags(tags().splice(i, 1)) },'x')
        )
      ),
      m('button', { onclick: () => tags(tags().concat({ name: '', content : ''})) },'+'),
    )
})

m.mount(document.body, {
  view: () => [
    m('h1', 'shares.wtf'),
    m('p', m('i', 'minor magic for all your debugging needs')),
    m('h3', 'edit content here'),
    m(Editor),
    m('h3', 'preview'),
    m('p', m('pre', renderMetaTags(tags()))),
    m('h3', 'share url'),
    m('p', window.location.href)
  ]
})
