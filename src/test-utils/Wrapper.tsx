import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";

import { store } from "@/store";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default Wrapper;
