export function useLogin() {
  const router = useRouter();
  const loginState = ref({
    name: "",
    password: "",
  });
  const handleClick = async () => {
    await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: loginState.value,
    });
    router.push("/news");
  };
  return { loginState, handleClick };
}
