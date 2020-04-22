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

const debounce = (func, delay) => {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, arguments), delay)
  }
}

const Editor = () => {
  const tagsArray = Object.entries(tags())
  const syncTags = () => tags(Object.fromEntries(tagsArray))

  const events = ['click', 'keydown', 'touchstart']
  events.map((evt) =>
    window.addEventListener(evt, debounce(syncTags, 300) , true)
  )

  return {
    view : () =>
      m('p',
        tagsArray.map(([k, v], i) =>
          m('', { key: i },
            m('input', { value: k, oninput : (e) => tagsArray[i][0] = e.target.value.trim() }),
            m('input', { value: v, oninput : (e) => tagsArray[i][1] = e.target.value.trim() }),
            m('button', { onclick : () => { tagsArray.splice(i, 1); syncTags() } } ,'x')
          )
        ),
        m('button', { onclick: () => { tagsArray.push(['', '']); syncTags() } },'+'),
      )
  }
}

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
