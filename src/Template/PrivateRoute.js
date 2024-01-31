import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { Auth } from "../Services/Auth";

const PrivateRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { user } = useSelector((state) => state.UserSlice);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!user || !user.id) {
          navigate("/"); // Nếu chưa đăng nhập, điều hướng đến trang chính
          return;
        }

        const userInfo = (await Auth.get_infoUser(user.id)).data.content;
        const isAdminUser = userInfo?.role === "ADMIN";
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error("Error checking admin status:", error.message);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  if (isAdmin === null) {
    return null;
  }
  if (isAdmin) {
    return children;
  }

  // Nếu không phải admin, điều hướng đến trang đăng nhập admin
  navigate("/");

  return null;
};

export default PrivateRoute;
