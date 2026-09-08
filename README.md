# The Clyve Portal

Real-app foundation for The Clyve Portal.

## What works now
- Next.js + TypeScript application shell
- Futuristic Clyve visual system
- Tasks CRUD: create, complete, delete, due date/time, priority
- Supabase-ready persistence
- Local-storage fallback before Supabase credentials are connected
- SQL schema with Row Level Security enabled

## Connect the database
1. Create a Supabase project.
2. Run `supabase/schema.sql` in its SQL editor.
3. Copy `.env.example` to `.env.local` and fill in the public project URL and anon key.
4. Run `npm install` then `npm run dev`.

## Security milestone
The included SQL policies are intentionally temporary for initial development. Before storing personal data or deploying broadly, connect authentication and replace the temporary policies with `auth.uid() = user_id` policies.
