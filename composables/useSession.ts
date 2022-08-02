export function useSession() {
  const router = useRouter()
  const loginState = ref({
    name: '',
    password: '',
  })
  const handleLogin = async () => {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginState.value),
    })
    if (res.ok) {
      router.push('/news')
    } else {
      const { message } = await res.json()
      alert(message)
    }
  }
  const handleLogout = async () => {
    await fetch('/logout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
    router.push('/login')
  }
  const checkSession = async () => {
    const res = await fetch('/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!res.ok) {
      router.push('/error')
      return false
    }
    return true
  }
  return { loginState, handleLogin, handleLogout, checkSession }
}
