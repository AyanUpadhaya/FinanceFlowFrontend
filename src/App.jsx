import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>loading....</div>
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
};

export default App;
