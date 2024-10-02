import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PageLayout } from "@/components";
import { ThemeProvider, defaultTheme } from "@/providers";
import { AppRouter } from "@/router";
import { store } from "@/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <PageLayout>
            <AppRouter />
          </PageLayout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
