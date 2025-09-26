import React, { useState } from 'react';
import { AuthService } from './utils/auth';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { Building2, Users, CreditCard, MessageSquare, Settings, Plus, Search, Filter, Home, Calendar, DollarSign, TrendingUp, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PropertiesView from './components/PropertiesView';
import TenantsView from './components/TenantsView';
import PaymentsView from './components/PaymentsView';
import MessagesView from './components/MessagesView';
import PropertyForm from './components/PropertyForm';
import TenantForm from './components/TenantForm';
import { mockProperties, mockTenants } from './data/mockData';

type View = 'dashboard' | 'properties' | 'tenants' | 'payments' | 'messages' | 'settings';
type Modal = 'property' | 'tenant' | null;
type AuthView = 'signin' | 'signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('signin');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const authService = AuthService.getInstance();

  // Check if user is already authenticated
  React.useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    authService.signOut();
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Show authentication forms if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {authView === 'signin' ? (
          <SignInForm 
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAuthView('signup')}
          />
        ) : (
          <SignUpForm 
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView('signin')}
          />
        )}
      </>
    );
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertiesView searchQuery={searchQuery} onAddProperty={() => setActiveModal('property')} properties={mockProperties} />;
      case 'tenants':
        return <TenantsView searchQuery={searchQuery} onAddTenant={() => setActiveModal('tenant')} tenants={mockTenants} />;
      case 'payments':
        return <PaymentsView searchQuery={searchQuery} />;
      case 'messages':
        return <MessagesView />;
      default:
        return <Dashboard />;
    }
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const handleClose = () => setActiveModal(null);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {activeModal === 'property' && <PropertyForm onClose={handleClose} />}
          {activeModal === 'tenant' && <TenantForm onClose={handleClose} />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PropManager</h1>
              <p className="text-sm text-gray-500">Property Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as View)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {authService.getCurrentUser()?.firstName} {authService.getCurrentUser()?.lastName}
              </p>
              <p className="text-xs text-gray-500">Property Manager</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-auto text-xs text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {currentView}
              </h2>
              <p className="text-gray-600">
                {currentView === 'dashboard' && 'Overview of your property management'}
                {currentView === 'properties' && 'Manage your property listings and details'}
                {currentView === 'tenants' && 'Manage tenant information and leases'}
                {currentView === 'payments' && 'Track rental payments and financial records'}
                {currentView === 'messages' && 'Communication with tenants and property owners'}
                {currentView === 'settings' && 'System settings and preferences'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {(currentView === 'properties' || currentView === 'tenants' || currentView === 'payments') && (
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              )}

              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {(currentView === 'properties' || currentView === 'tenants') && (
                <button
                  onClick={() => setActiveModal(currentView === 'properties' ? 'property' : 'tenant')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {currentView === 'properties' ? 'Property' : 'Tenant'}</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {renderModal()}
    </div>
  );
}

export default App;