import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../common/LoadingScreen';

const Layout = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      
      {/* Right Sidebar (Discover, Trending) */}
      <div className="hidden lg:block lg:w-80">
        <RightSidebar />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <MobileNav />
      </div>
    </div>
  );
};

export default Layout;