import Shell from '@/components/Shell';import TaskBoard from '@/components/TaskBoard'
export default function Tasks(){return <Shell><header><div><div className="eyebrow">CLYVE · TASKS</div><h1>Tasks</h1><p>Create, prioritize and complete tasks.</p></div></header><section className="panel"><TaskBoard/></section></Shell>}
