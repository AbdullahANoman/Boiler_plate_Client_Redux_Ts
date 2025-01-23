import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "noman4131",
    },
  });

  const [login, { error, isLoading, isError }] = useLoginMutation();
  if (error) {
    return <p>Error Happen In Login Page</p>;
  }

  if (isLoading || isError) {
    return <p>Loading ... In Login Page</p>;
  }

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await login(data).unwrap();
      //NOTE get token from data.accessToken
      const token = res.data.accessToken;
      // NOTE give the token to call verifyToken in utils function
      const user = verifyToken(token) as TUser;
      dispatch(
        setUser({
          user: user,
          token: token,
        })
      );
      navigate(`/${user?.userRole}/dashboard`);
      toast.success("Logged In", { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong", {
        id: toastId,
        duration: 20000,
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        alignItems: "center",
      }}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" {...register("id")} />
          </div>
          <div>
            <label htmlFor="id">Password</label>
            <input type="text" id="id" {...register("password")} />
          </div>
          <Button htmlType="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
