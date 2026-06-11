import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  CalendarX, 
  Users, 
  BookOpen, 
  KeyRound, 
  UserCog, 
  LogOut, 
  Shield, 
  X,
  ShieldAlert,
  Archive,
  BarChart2,
  PlaySquare,
  UserMinus,
  MessageSquare,
  Clock,
  Briefcase
} from 'lucide-react';

import logo from '../assets/logo.png';
import { RankIcon } from './RankIcon';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout, hasPermission } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const getRankBadgeColor = (role: string) => {
    switch (role) {
      case 'inspetor-superintendente':
        return 'bg-rose-100 text-rose-850 border-rose-200';
      case 'inspetor-coordenador':
        return 'bg-orange-100 text-orange-850 border-orange-200';
      case 'inspetor-chefe':
        return 'bg-amber-100 text-amber-850 border-amber-200';
      case 'inspetor':
        return 'bg-sky-100 text-sky-850 border-sky-200';
      case 'subinspetor':
        return 'bg-blue-100 text-blue-850 border-blue-200';
      case 'classe-distinta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'classe-especial':
        return 'bg-emerald-100 text-emerald-850 border-emerald-200';
      case 'gcm-1-classe':
        return 'bg-emerald-100 text-emerald-800 border-emerald-250';
      case 'gcm-2-classe':
        return 'bg-teal-100 text-teal-850 border-teal-200';
      case 'gcm-3-classe':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case '1-soldado':
      case 'guarda-civil':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case '2-soldado':
      case 'aluno-guarda':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRankLabel = (role: string) => {
    const roles: Record<string, string> = {
      'inspetor-superintendente': 'Insp. Superintendente',
      'inspetor-coordenador': 'Insp. Coordenador',
      'inspetor-chefe': 'Insp. Chefe',
      'inspetor': 'Inspetor',
      'subinspetor': 'Subinspetor',
      'classe-distinta': 'Classe Distinta',
      'classe-especial': 'Classe Especial',
      'gcm-1-classe': 'GCM 1ª Classe',
      'gcm-2-classe': 'GCM 2ª Classe',
      'gcm-3-classe': 'GCM 3ª Classe',
      '1-soldado': 'Guarda Civil',
      'guarda-civil': 'Guarda Civil',
      '2-soldado': 'Aluno Guarda',
      'aluno-guarda': 'Aluno Guarda'
    };
    return roles[role] || role;
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, permission: 'dashboard' },
    { path: '/bate-ponto', label: 'Bater Ponto', icon: Clock, permission: 'dashboard' },
    { path: '/informativos', label: 'Informativos', icon: BookOpen, permission: 'informativos' },
    { path: '/relatorios', label: 'PTR', icon: FileText, permission: 'relatorios' },
    { path: '/cursos', label: 'Cursos & Apostilas', icon: BookOpen, permission: 'cursos' },
    { path: '/chat', label: 'Bate-Papo da Corporação', icon: MessageSquare, permission: 'chat' },
    { path: '/social', label: 'Comunidade & Clipes', icon: PlaySquare, permission: 'social' },
    { path: '/ausencias', label: 'Ausências', icon: CalendarX, permission: 'ausencias' },
    { path: '/subdivisoes', label: 'Subdivisões', icon: Users, permission: 'comandos' },
    { path: '/corregedoria', label: 'Corregedoria Interna', icon: ShieldAlert, permission: 'corregedoria' },
    { path: '/rh-ponto', label: 'RH - Controle de Ponto', icon: Briefcase, permission: 'users' },
    { path: '/metricas', label: 'Métricas da Corporação', icon: BarChart2, permission: 'metrics' },
    { path: '/usuarios', label: 'Gestão de Membros', icon: UserCog, permission: 'users' },
    { path: '/exoneracoes', label: 'Exonerações', icon: UserMinus, permission: 'exoneracoes' },
    { path: '/permissoes', label: 'Permissões de Acesso', icon: KeyRound, permission: 'permissions' }
  ];

  const visibleMenuItems = menuItems.filter(item => {
    // Permissões de acesso sempre restrito para Coronel / Tenente-Coronel por segurança de elevação de privilégios.
    if (item.path === '/permissoes') {
      return user?.role === 'inspetor-superintendente' || user?.role === 'inspetor-coordenador';
    }
    return hasPermission(item.permission);
  });

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between transition-transform duration-300 transform
    lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={sidebarClasses}>
        <div>
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-900 bg-zinc-950">
            <div className="flex items-center gap-3">
              <img src={logo} alt="GCM Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
              <div>
                <h1 className="font-outfit font-extrabold text-lg tracking-wider bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">GCM</h1>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Painel Tático</p>
              </div>
            </div>
            <button className="lg:hidden p-1.5 text-zinc-450 hover:text-white rounded-lg hover:bg-zinc-900" onClick={toggleSidebar}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-sky-600 text-white border border-sky-500/50 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer Panel */}
        {user && (
          <div 
            className="p-4 border-t border-zinc-900 bg-zinc-950 relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && (
              <div className="absolute bottom-[4.5rem] left-4 w-56 bg-zinc-800 border border-zinc-700 rounded-xl shadow-[0_-5px_25px_rgba(0,0,0,0.5)] p-3 animate-in fade-in zoom-in-95 duration-100 z-50">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Cursos & Especializações</div>
                <div className="flex flex-wrap gap-1.5">
                  {user.courseTags && user.courseTags.length > 0 ? (
                    user.courseTags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[9px] font-bold">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500 text-[10px] italic">Nenhum curso concluído</span>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 relative group">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-300 border border-zinc-700 uppercase overflow-hidden relative">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                  {/* Botão flutuante para edição rápida (aparece no hover da foto) */}
                  <button 
                    onClick={() => {
                      if (window.innerWidth < 1024) toggleSidebar();
                      navigate('/perfil');
                    }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Editar Perfil"
                  >
                    <UserCog className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="overflow-hidden flex flex-col items-start">
                  <h4 className="text-xs font-semibold text-zinc-200 truncate">{user.name}</h4>
                  <div className="flex items-center gap-1.5 opacity-90 border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 rounded shadow-inner">
                    <RankIcon role={user.role} className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{getRankLabel(user.role)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={logout} 
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                title="Desconectar"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
