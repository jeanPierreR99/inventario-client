import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { RouteAdmin } from "./routes/RouteAdmin";
import { RouteLogin } from "./routes/RouteLogin";
import useStoreLogin from "./features/login/store/useStoreLogin";
import { getStorage } from "./lib/functions";
import { Loader2 } from "lucide-react";

function App() {
  const { isLogIn, login } = useStoreLogin();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const data = getStorage();
    if (data) {
      login(
        data.name,
      );
    }
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  const router = createBrowserRouter(
    isLogIn
      ? RouteAdmin
      : RouteLogin
  );

  return <RouterProvider router={router} />;
}

export default App;
