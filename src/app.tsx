import AppRouter from "@/router";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        draggable
        theme="colored"
      />
      <AppRouter />
    </Provider>
  );
}

export default App;
