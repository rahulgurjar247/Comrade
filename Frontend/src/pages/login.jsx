import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loding, setloding] = useState(false);
  const email = useRef();
  const password = useRef();

  const handleFormChange = (e) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  function Formclear() {
    password.current.value = "";
    email.current.value = "";
    (loginData.email = ""), (loginData.password = "");
  }

  function formValidation() {
    if (loginData.email == "" || loginData.password == "") {
      toast("cannot submit empty form", {
        progress: 5000,
        // autoClose: 5000,
        position: "top-center",
      });
      return false;
    } else if (loginData.password.length < 8) {
      toast("password can't be less than 8");
      return false;
    }
    return true;
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setloding(true);
      if (formValidation()) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(loginData);
            resolve();
          }, 2000);
        });
        setloding(false);
        Formclear();
      } else {
        return Error("form is Empty");
      }
    } catch (err) {
      console.log("something is wrong with form submittion", err);
      toast("something is wrong with form submittion", {
        autoClose: true,
      });
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-green-50 flex justify-center pt-36 font-mono ">
        <div className=" w-80 p-2 flex flex-col gap-3 ">
          <h1 className="text-center font-medium text-3xl">login</h1>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleFormChange}
                ref={email}
                className=" bg-inherit outline-none no-underline border-b-2 border-black"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                onChange={handleFormChange}
                ref={password}
                className="outline-none no-underline border-b-2 border-black bg-inherit"
              />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <button
                className="bg-blue-200 rounded-md w-full p-1"
                onClick={handleFormSubmit}
              >
                Login
              </button>
              <div>
                {" "}
                Don't have a account{" "}
                <span className="text-blue-800">
                  <a href="/signup">Signup</a>{" "}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;