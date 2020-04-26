import b from 'bss'

b.$animate.out = (time, styles) => ({ dom }) => new Promise(res => {
  dom.addEventListener('animationend', res, { once: true })
  dom.classList.add(b.$animate(time, styles))
})

b.css({
  html: b`
    height 100%
    box-sizing border-box
    font-family -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
  `,
  body: b`
    m 0
    min-height 100%
    padding 1em
  `,
  'input, textarea': b`
    font-family inherit
  `,
  '*, *:before, *:after': b`
    boxSizing inherit
  `,
  'pre': b`
    font-family: monospace;
    outline: 2px dotted #ddd;
    min-height: 1.9em;
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: 0.3em;
  `,
  'p': b`
    word-wrap break-word
  `,
  'code': `
    display:block;
    background: none;
    font-family: monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5em;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  `,
  '[contenteditable]': `
    outline: none;
  `,
  '[contenteditable] b': `
    font-weight: normal;
  `,
  '[contenteditable] i': `
    font-style: normal;
  `,
})

b.helper({
  desktop: s => b.$media('(min-width: 1024px)', b(s))
})
