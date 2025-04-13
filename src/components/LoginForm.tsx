import { EyeFilledIcon } from "@/app/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/EyeSlashFilledIcon";
import { handleLogin } from "@/lib/actions";
import { Button,Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm({ setSelected }: { setSelected: any }) {
  const router = useRouter();
  const [loginFields, setLoginFileds] = useState({
    username: "",
    password: "",
  });
  const [loading,setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isValid,setIsValid] = useState({
    username: true,
    password: true,
  });
  const [isSubmitted,setIsSubmitted] = useState(false);

  const [ip,setIp] = useState('');

  useEffect(()=>{
    isSubmitted && setIsValid({username: !(!loginFields.username.length), password: !(!loginFields.password.length)})
  },[loginFields])

  const toggleVisibility = () => setIsVisible(!isVisible);
  const submitLogin = async () => {
    setIsSubmitted(true)
    setIsValid({username: !(!loginFields.username.length), password: !(!loginFields.password.length)})
    if (loginFields.password.length && loginFields.username.length) {
      toast.success("Wait pannu papom 🤔");
      try {
        setLoading(true);
        await handleLogin({...loginFields,ip});
        localStorage.setItem('user',loginFields.username);
        router.push("/dashboard");
      } catch (err) {
        toast.error("😁 Unable to login");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("😁 please enter all the required fields");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/get-cookie')
      .then(res => res.json())
      .then(data => {
        console.log('GET COOKIE:', data);
        if (!data.token) {
          fetch('/api/set-cookie')
            .then(res => res.json())
            .then(data => {
              console.log('SET COOKIE:', data);
              data.ip && setIp(data.ip)
            })
            .catch(err => console.error('Fetch error (set-cookie):', err));
        }
        else{
          setIp(data.token)
        }
      })
      .catch(err => console.error('Fetch error (get-cookie):', err)).finally(()=>{
        setLoading(false)
      });
  }, []);  
  

  return (
    <form className="flex flex-col gap-6 login-form" onSubmit={submitLogin} >
      <Input
        isRequired
        label="Username"
        placeholder="Enter your user name"
        type="text"
        value={loginFields.username}
        onChange={(e) =>
          setLoginFileds({ ...loginFields, username: e.target.value })
        }
        isInvalid={!isValid.username}
      />

      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        value={loginFields.password}
        onChange={(e) =>
          setLoginFileds({ ...loginFields, password: e.target.value })
        }
        isInvalid={!isValid.password}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          className="bg-primary text-white"
          isLoading={loading}
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
