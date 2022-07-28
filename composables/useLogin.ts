export function useLogin() {
  const router = useRouter();
  const stateLogin = ref({
    name: "",
    password: "",
  });
  const handleClick = async () => {
    await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: stateLogin.value,
    });
    router.push("/news");
  };
  return { stateLogin, handleClick };
}
