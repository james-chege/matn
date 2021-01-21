import React  from "react";
import { BrowserRouter } from "react-router-dom";
// import { ReactQueryDevtools } from "react-query-devtools";
import  {QueryClient, QueryClientProvider } from "react-query";
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";
import "./App.scss";

function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
      </QueryClientProvider>
  );
}

export default App;
