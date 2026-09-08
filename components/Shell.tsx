'use client'
import Link from 'next/link'
import { Home, CheckSquare, CalendarDays, WalletCards, Receipt, HeartPulse, Sparkles } from 'lucide-react'
export default function Shell({children}:{children:React.ReactNode}) {
 const nav=[['/','Today',Home],['/tasks','Tasks',CheckSquare],['#','Calendar',CalendarDays],['#','Money',WalletCards],['#','Bills',Receipt],['#','Health',HeartPulse]] as const
 return <div className="app"><aside><div className="brand"><div className="mark">C</div><div><b>CLYVE</b><small>THE PORTAL</small></div></div><nav>{nav.map(([href,label,Icon])=><Link key={label} href={href} className="nav"><Icon size={18}/><span>{label}</span></Link>)}</nav><div className="system"><i/> SYSTEM ONLINE</div></aside><main>{children}</main><div className="assistant"><Sparkles size={18}/><div><b>ASK CLYVE</b><small>Assistant action layer coming next</small></div><input placeholder="What do I need to handle today?" disabled/></div></div>
}
