import {CartProvider} from './context/contextAPI';
import AppLayout from './components/AppLayout';

function App(){
  
    return (
      <>
      <CartProvider>
        <AppLayout />
      </CartProvider>
      </>
    )
}

export default App;