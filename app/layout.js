import Navbar from '@/components/Header/navbar';
import './globals.css';
import SessionWrapper from '@/components/ui/auth/sessionWrapper';
import Footer from '@/components/footer';
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
