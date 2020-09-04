import React, {useState, useContext, useCallback, useEffect} from 'react';
import useBackendRequests from '../hooks/useBackend';
import {getAccessToken} from '../config/backend';

const EmpresasContext = React.createContext({
  empresas: [],
  refresh: () => {},
});

export function useEmpresas() {
  const empresasContext = useContext(EmpresasContext);

  return [empresasContext.empresas, empresasContext.refresh];
}

function EmpresasProvider({children}) {
  const [empresas, setEmpresas] = useState([]);
  const {get} = useBackendRequests();

  const refreshCompanies = useCallback(() => {
    getAccessToken().then(token => {
      get('get_companies').then(resultados => {
        setEmpresas(resultados);
      });
    });
  }, []);

  useEffect(() => {
    refreshCompanies();
  }, [refreshCompanies]);

  return (
    <EmpresasContext.Provider value={{empresas, refresh: refreshCompanies}}>
      {children}
    </EmpresasContext.Provider>
  );
}

export default EmpresasProvider;
