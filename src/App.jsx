import { useEffect, useState } from "react";
import authService from "./services/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/slices/authSlice";
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("error in useEffect :: ", error))
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <main>
          TODO:
        </main>
        <Footer/>
      </div>
    </div>
  ) : 
    <div>
      loading
    </div>;
}

export default App;
