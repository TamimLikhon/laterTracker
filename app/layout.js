import Navbar from '@/app/components/Header/navbar';
import './globals.css';
import SessionWrapper from '@/app/components/ui/auth/sessionWrapper';
import Footer from '@/app/components/footer';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
        <Navbar />
        {children}
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
