import React from 'react';
import AuthProvider from './context/auth';
import EmpresasProvider from './context/empresas';

function Providers({children}) {
  return (
    <AuthProvider>
      <EmpresasProvider>{children}</EmpresasProvider>
    </AuthProvider>
  );
}

export default Providers;
