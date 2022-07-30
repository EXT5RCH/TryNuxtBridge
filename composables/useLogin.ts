export function useLogin () {
  const router = useRouter()
  const loginState = ref({
    name: '',
    password: ''
  })
  const handleSubmit = async () => {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(loginState.value)
    })
    if (res.ok) {
      router.push('/news')
    } else {
      const { message } = await res.json()
      alert(message)
    }
  }
  return { loginState, handleSubmit }
}
