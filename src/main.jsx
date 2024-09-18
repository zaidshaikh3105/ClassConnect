import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import store from "./store/store.js"; // Your Redux store

// Create your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap the app in Provider for Redux */}
      <RouterProvider router={router}>
        {" "}
        {/* Pass router prop here */}
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
