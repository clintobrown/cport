import MoneyStats from '@/components/MoneyStats'
import Shell from '@/components/Shell'
import TaskBoard from '@/components/TaskBoard'
export default function Home(){return <Shell><header><div><div className="eyebrow">MONDAY · THE CLYVE PORTAL</div><h1>Command Center</h1><p>Your schedule, obligations and priorities in one place.</p></div><div className="header-actions"><a className="brief" href="https://claude.ai/new?q=gobot" target="_blank" rel="noopener" title="Start your brief in Claude">▶ Brief</a></div></header><section className="hero"><div><div className="pulse"><i/> CLYVE STATUS</div><h2>Foundation is live.</h2><p>The Tasks module now has a real database-ready data layer.</p>{aiLinks}</div></section><MoneyStats/><section className="panel"><div className="title"><h2>Tasks</h2><span>REAL MODULE 01</span></div><TaskBoard/></section></Shell>}

  import {createElement as h} from 'react'
  const aiShortcuts=[{name:'Claude',url:'https://claude.ai/new'},{name:'ChatGPT',url:'https://chatgpt.com'},{name:'Gemini',url:'https://gemini.google.com/app'},{name:'Grok',url:'https://grok.com'},{name:'Perplexity',url:'https://www.perplexity.ai'}]
  const aiLinks=h('div',{style:{display:'flex',flexWrap:'wrap',gap:'10px',marginTop:'16px'}},aiShortcuts.map(ai=>h('a',{key:ai.name,href:ai.url,target:'_blank',rel:'noopener noreferrer',style:{padding:'8px 16px',borderRadius:'10px',border:'1px solid rgba(34,211,238,.35)',background:'rgba(255,255,255,.04)',color:'#67e8f9',fontSize:'14px',fontWeight:600,textDecoration:'none'}},ai.name)))
