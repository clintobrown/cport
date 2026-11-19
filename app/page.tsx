import MoneyStats from '@/components/MoneyStats'
import Shell from '@/components/Shell'
import TaskBoard from '@/components/TaskBoard'
export default function Home(){return <Shell><header><div><div className="eyebrow">MONDAY · THE CLYVE PORTAL</div><h1>Command Center</h1><p>Your schedule, obligations and priorities in one place.</p></div></header><section className="hero"><div><div className="pulse"><i/> CLYVE STATUS</div><h2>Foundation is live.</h2><p>The Tasks module now has a real database-ready data layer.</p></div></section><MoneyStats/><section className="panel"><div className="title"><h2>Tasks</h2><span>REAL MODULE 01</span></div><TaskBoard/></section></Shell>}
