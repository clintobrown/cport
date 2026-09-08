import './globals.css'
export const metadata = { title: 'The Clyve Portal', description: 'Personal operating system' }
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
