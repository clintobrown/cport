'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

type Task={id:string;title:string;due_at:string|null;priority:'low'|'normal'|'high';completed:boolean}
const localKey='clyve.tasks.v1'

export default function TaskBoard(){
 const [tasks,setTasks]=useState<Task[]>([]); const [title,setTitle]=useState(''); const [due,setDue]=useState(''); const [priority,setPriority]=useState<Task['priority']>('normal'); const [mode,setMode]=useState<'database'|'local'>('local');
 useEffect(()=>{void load()},[])
 async function load(){const sb=getSupabase(); if(sb){const {data,error}=await sb.from('tasks').select('id,title,due_at,priority,completed').order('created_at',{ascending:false}); if(!error){setTasks((data||[]) as Task[]);setMode('database');return}} const saved=localStorage.getItem(localKey);setTasks(saved?JSON.parse(saved):[]);setMode('local')}
 function saveLocal(next:Task[]){setTasks(next);localStorage.setItem(localKey,JSON.stringify(next))}
 async function add(e:React.FormEvent){e.preventDefault();if(!title.trim())return;const sb=getSupabase();const draft={title:title.trim(),due_at:due?new Date(due).toISOString():null,priority,completed:false};if(sb){const {data,error}=await sb.from('tasks').insert(draft).select('id,title,due_at,priority,completed').single();if(!error&&data){setTasks([data as Task,...tasks]);setMode('database')}}else saveLocal([{id:crypto.randomUUID(),...draft},...tasks]);setTitle('');setDue('')}
 async function toggle(t:Task){const next={...t,completed:!t.completed};const sb=getSupabase();if(sb&&mode==='database'){await sb.from('tasks').update({completed:next.completed}).eq('id',t.id);setTasks(tasks.map(x=>x.id===t.id?next:x))}else saveLocal(tasks.map(x=>x.id===t.id?next:x))}
 async function remove(t:Task){const sb=getSupabase();if(sb&&mode==='database'){await sb.from('tasks').delete().eq('id',t.id);setTasks(tasks.filter(x=>x.id!==t.id))}else saveLocal(tasks.filter(x=>x.id!==t.id))}
 return <><div className="mode">DATA MODE: <b>{mode==='database'?'SUPABASE DATABASE':'LOCAL FALLBACK'}</b></div><form className="taskform" onSubmit={add}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add something you need to do…"/><input type="datetime-local" value={due} onChange={e=>setDue(e.target.value)}/><select value={priority} onChange={e=>setPriority(e.target.value as Task['priority'])}><option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option></select><button>Add task</button></form><div className="tasklist">{tasks.length===0&&<div className="empty">No tasks yet.</div>}{tasks.map(t=><div className={'task '+(t.completed?'done':'')} key={t.id}><input type="checkbox" checked={t.completed} onChange={()=>void toggle(t)}/><div className="taskcopy"><b>{t.title}</b><small>{t.due_at?new Date(t.due_at).toLocaleString():'No due date'} · {t.priority} priority</small></div><button className="delete" onClick={()=>void remove(t)}>Delete</button></div>)}</div></>
}
