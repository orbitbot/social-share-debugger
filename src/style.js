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
    white-space pre-wrap
  `,
  'p': b`
    word-wrap break-word
  `
})

b.helper({
  desktop: s => b.$media('(min-width: 1024px)', b(s))
})
