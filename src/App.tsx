import { Provider } from "react-redux";

import { ThemeProvider, appTheme } from "@/providers";
import { AppRouter } from "@/router";
import { store } from "@/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
