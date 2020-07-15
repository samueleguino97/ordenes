import React, {useState, useContext, useCallback, useEffect} from 'react';
import useBackendRequests from '../hooks/useBackend';

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
    get('get_companies').then(resultados => {
      setEmpresas(resultados);
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
