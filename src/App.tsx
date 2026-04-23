import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f6f8' }}>
      <nav
        className="navbar"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e4ea',
          padding: '14px 0',
        }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <img src="/logo.svg" alt="WIAM Group" height="22" />
          <span style={{ color: '#11253e', fontSize: '13px', opacity: 0.7 }}>
            Исполнитель ТЗ: Андрей Беляев
          </span>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
