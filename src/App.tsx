import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OverlayRoot from "components/OverlayRoot/OverlayRoot";
import Router from "router/Router";
import { useState, useEffect } from "react";
import supabase from "supabase/index";


const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <OverlayRoot/>
    </QueryClientProvider>
  );
}

export default App;
