import SignIn from "../screens/SignIn";
import Home from "../screens/Home/Home";
import SignUpScreen from "../screens/SignUpScreen";
import AddProduct from "../screens/Home/AddProduct";
import ProductDetailDashboard from "../screens/Home/ProductDetailDashboard";

export const routeConfig = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/home/products",
    component: AddProduct,
  },

  {
    path: "/",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUpScreen,
  },
  {
    path: "/home/products/:id",
    component: ProductDetailDashboard,
  },
];
