'use client'
import { createElement as h, Fragment, useState } from 'react'

type MoneyItem = { key: string; label: string; value: string; className?: string }

const items: MoneyItem[] = [
  { key: 'paycheck', label: 'Next paycheck', value: '$3,500' },
  { key: 'rent', label: 'Rent', value: '$1,600' },
  { key: 'repayment', label: 'Repayment', value: '$1,000' },
  { key: 'safe', label: 'Safe to spend', value: '$900', className: 'good' },
  ]

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

// Open eye: shown when amounts are visible
const EyeOpen = () => h('svg', svgProps,
                        h('path', { d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' }),
                        h('circle', { cx: 12, cy: 12, r: 3 }))

// Eye with a slash: shown when amounts are hidden (the default)
const EyeOff = () => h('svg', svgProps,
                       h('path', { d: 'M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94' }),
                       h('path', { d: 'M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19' }),
                       h('path', { d: 'M14.12 14.12a3 3 0 1 1-4.24-4.24' }),
                       h('line', { x1: 2, y1: 2, x2: 22, y2: 22 }))

// Money amounts are hidden by default on every page load.
// This state is intentionally NOT saved anywhere, so a refresh hides everything again.
export default function MoneyStats() {
  const [showAll, setShowAll] = useState(false)
  const [peeked, setPeeked] = useState<Set<string>>(new Set())

const toggleAll = () => {
  setShowAll(v => !v)
  setPeeked(new Set())
}

const peek = (key: string) => {
  if (showAll) return
  setPeeked(prev => {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    return next
  })
}

const label = showAll ? 'Hide all amounts' : 'Show all amounts'
  const toggleButton = h('div', { className: 'money-toggle-row' },
                         h('button', {
                           type: 'button',
                           className: `moneytoggle ${showAll ? 'on' : ''}`,
                           onClick: toggleAll,
                           'aria-pressed': showAll,
                           'aria-label': label,
                           title: label,
                         }, showAll ? h(EyeOpen) : h(EyeOff)))

const cards = items.map(item => {
  const visible = showAll || peeked.has(item.key)
  return h('div', { key: item.key, className: `metric ${item.className ?? ''}` },
           h('span', null, item.label),
           h('strong', {
             className: `amt ${visible ? '' : 'masked'}`,
             role: 'button',
             tabIndex: 0,
             title: visible ? (showAll ? 'Amounts visible' : 'Click to hide') : 'Click to reveal',
             onClick: () => peek(item.key),
             onKeyDown: (e: { key: string; preventDefault: () => void }) => {
               if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); peek(item.key) }
             },
           }, visible ? item.value : '$••••'))
})

return h(Fragment, null, toggleButton, h('section', { className: 'stats' }, cards))
}
