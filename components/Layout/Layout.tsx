import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className='container mx-auto py-5 px-5 md:px-0 md:py-10'>
    {children}
  </div>
}

export default Layout
