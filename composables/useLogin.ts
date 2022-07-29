export function useLogin() {
  const router = useRouter();
  const loginState = ref({
    name: "",
    password: "",
  });
  const handleSubmit = async () => {
    await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginState.value),
    });
    router.push("/news");
  };
  return { loginState, handleSubmit };
}
