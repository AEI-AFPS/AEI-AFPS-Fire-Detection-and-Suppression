import { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/button';
import { LogOut, Package, Briefcase, Database, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductsManager from '../../components/admin/ProductsManager';
import ProjectsManager from '../../components/admin/ProjectsManager';
import TestimonialsManager from '../../components/admin/TestimonialsManager';
import AwardsManager from '../../components/admin/AwardsManager';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'projects' | 'testimonials' | 'awards'>('products');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Top Header */}
        <div className="bg-card border-b border-border/50 relative z-40">
          <div className="container-full flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-flame-crimson/10 border border-flame-crimson/20 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-flame-orange" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage dynamic content</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="container-full py-8 flex flex-col md:flex-row gap-8 min-w-0">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm shrink-0 md:w-full ${
                  activeTab === 'products'
                    ? 'bg-gradient-flame text-white shadow-flame'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                }`}
              >
                <Package className="h-4 w-4" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm shrink-0 md:w-full ${
                  activeTab === 'projects'
                    ? 'bg-gradient-flame text-white shadow-flame'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Projects
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm shrink-0 md:w-full ${
                  activeTab === 'testimonials'
                    ? 'bg-gradient-flame text-white shadow-flame'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                }`}
              >
                <Star className="h-4 w-4" />
                Testimonials
              </button>
              <button
                onClick={() => setActiveTab('awards')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium text-sm shrink-0 md:w-full ${
                  activeTab === 'awards'
                    ? 'bg-gradient-flame text-white shadow-flame'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
                }`}
              >
                <Star className="h-4 w-4" />
                Awards
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 bg-card border border-border/50 rounded-2xl p-4 md:p-6 lg:p-8 shadow-elevated min-w-0 overflow-x-hidden">
            {activeTab === 'products' ? (
              <ProductsManager />
            ) : activeTab === 'projects' ? (
              <ProjectsManager />
            ) : activeTab === 'testimonials' ? (
              <TestimonialsManager />
            ) : (
              <AwardsManager />
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
