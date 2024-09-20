import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import store from "./store/store.js"; // Your Redux store
import { AuthLayout, Login } from "./components/index.js";

import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditForm from "./pages/EditForm";
import Post from "./pages/Post";
import AllPost from "./pages/AllPost";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditForm />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Wrap the app in Provider for Redux */}
      <RouterProvider router={router} />
      {/* Pass router prop here */}
    </Provider>
  </StrictMode>
);
