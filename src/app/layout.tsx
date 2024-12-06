import { Inter } from 'next/font/google'
import { ThemeProvider } from '@expo/components/theme-provider'
import { Toaster } from '@expo/components/ui/toaster'
import './globals.css'
import { Header } from '@expo/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expert Roster System',
  description: 'A comprehensive platform for managing and discovering expert profiles',
}

///<Header isAuthenticated={isAuthenticated} user={user} />

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
    const isAuthenticated = false;
    const user = null;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}


