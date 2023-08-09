import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OverlayRoot from "components/OverlayRoot/OverlayRoot";
import Router from "router/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <OverlayRoot/>
    </QueryClientProvider>
  );
}

export default App;
