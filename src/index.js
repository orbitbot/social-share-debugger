import './dev.js'
import './style.js'

import m from 'mithril'
import stream from 'mithril-stream'
import misbehave from 'misbehave'

window.misbehave = misbehave

const p = console.log

window.addEventListener('resize', m.redraw)
window.addEventListener('orientationchange', m.redraw)

const tags = stream(window.initialState)
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

const Editor = {
  oncreate : ({ dom }) => {
    dom.textContent = tags()
    misbehave(dom, { oninput : (text) => tags(text) })
  },
  view : () =>
    m('code#editor', {
      contenteditable : true,
      autocorrect     : 'off',
      autocapitalize  : 'off',
      spellcheck      : false
    })
}

m.mount(document.body, {
  view: () => [
    m('h1', 'shares.wtf'),
    m('p', m('i', 'minor magic for all your debugging needs')),
    m('h3', 'edit content here'),
    m('pre', { onclick : () => document.querySelector('#editor').focus() },
      m(Editor),
    ),
    m('h3', 'share url'),
    m('p', window.location.href)
  ]
})
