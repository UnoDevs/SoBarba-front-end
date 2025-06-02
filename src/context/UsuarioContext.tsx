import { createContext, useContext, useState, ReactNode, useEffect  } from "react";

interface Usuario {
  id: number;
  name: string;
  description: string;
  birthDate: string;
  email: string,
  phone: string,
  active: boolean,
  cpf: string,
  tipo: "cliente" | "funcionario";
}

interface UsuarioContextType {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  adicionarUsuario: (usuario: Usuario) => void;  // Função para adicionar um usuário
}

const UsuariosContext = createContext<UsuarioContextType | undefined>(undefined);

interface UsuarioProviderProps {
  children: ReactNode;
}

// Provedor de contexto para envolver os componentes
export const UsuarioContextProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const usuariosSalvos = localStorage.getItem("usuarios");
    return usuariosSalvos ? JSON.parse(usuariosSalvos) : [];  // Retorna os usuários salvos ou um array vazio
  })

   // Ao carregar o componente, tentar obter os usuários salvos no localStorage
   useEffect(() => {
    const usuariosSalvos = localStorage.getItem("usuarios");
    if (usuariosSalvos) {
      setUsuarios(JSON.parse(usuariosSalvos));  // Carrega os usuários do localStorage
    }
  }, []);

  const adicionarUsuario = (usuario: Usuario) => {
    const novosUsuarios = [...usuarios, usuario];
    setUsuarios(novosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(novosUsuarios)); // Salva no localStorage
  };

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios, adicionarUsuario }}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error("useUsuarios deve ser usado dentro de um UsuariosProvider");
  }
  return context;
};
