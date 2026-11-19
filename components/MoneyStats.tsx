'use client'
import { createElement as h, Fragment, useState } from 'react'

type MoneyItem = { key: string; label: string; value: string; className?: string }

const items: MoneyItem[] = [
  { key: 'paycheck', label: 'Next paycheck', value: '$3,500' },
  { key: 'rent', label: 'Rent', value: '$1,600' },
  { key: 'repayment', label: 'Repayment', value: '$1,000' },
  { key: 'safe', label: 'Safe to spend', value: '$900', className: 'good' },
  ]

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

const toggleButton = h('div', { className: 'money-toggle-row' },
                       h('button', {
                         type: 'button',
                         className: `moneytoggle ${showAll ? 'on' : ''}`,
                         onClick: toggleAll,
                         'aria-pressed': showAll,
                         title: showAll ? 'Hide all amounts' : 'Show all amounts',
                       }, showAll ? '◉ Hide $' : '◌ Show $'))

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
