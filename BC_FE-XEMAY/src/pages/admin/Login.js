import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginAdmin, authLoginAdmin } from "../../redux/silce/admin/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.admin.auth);
  useEffect(() => {
    dispatch(authLoginAdmin());
    if (isAuth && isAuth.success === true) {
      navigate("/admin/dashboard");
    }
  }, [isAuth]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const isValidInput = () => {
    if (!username) {
      toast.error("Vui lòng nhập tên đăng nhập !");
      return false;
    }
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu !");
      return false;
    }
    return true;
  };
  const loginClick = () => {
    const check = isValidInput();
    if (check === true) {
      let data = {
        username: username,
        password: password,
      };
      dispatch(loginAdmin(data)).then((res) => {
        if (res.payload && res.payload.success === true) {
          toast.success(`${res.payload.message}`);
        }
        if (res.payload && res.payload.detail) {
          toast.error(`${res.payload.detail}`);
        }
      });
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(https://static8.depositphotos.com/1000563/912/v/950/depositphotos_9123608-stock-illustration-abstract-background-with-motorcycle-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "40%",
            backgroundColor: "#f8f9fa",
            height: "500px",
            borderRadius: "20px",
          }}
        >
          <div style={{ paddingTop: "100px" }}>
            <h4 style={{ textAlign: "center", color: "#cc0000" }}>
              LOGIN ADMIN
            </h4>
            <Form style={{ width: "80%", margin: "auto" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ color: "#cc0000" }}>
                  Tên đăng nhập:
                </Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Nhập tên đăng nhập..."
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ color: "#cc0000" }}>Mật khẩu:</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#cc0000",
                  borderColor: "#cc0000",
                }}
                variant="primary"
                type="button"
                onClick={() => loginClick()}
              >
                ĐĂNG NHẬP
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
