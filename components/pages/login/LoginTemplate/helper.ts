export function useLogin() {
  const name = ref("");
  const password = ref("");
  const handleClick = () => {
    alert("ページ遷移");
  };
  return { name, password, handleClick };
}
