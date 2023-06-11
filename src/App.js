import './App.css';

import UserForm from './UserForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <UserForm />
      </div>
     </QueryClientProvider>
    
  );
}

export default App;
