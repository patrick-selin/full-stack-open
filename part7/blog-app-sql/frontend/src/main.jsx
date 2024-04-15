import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { BrowserRouter as Router} from "react-router-dom";

import { Provider } from "react-redux";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
