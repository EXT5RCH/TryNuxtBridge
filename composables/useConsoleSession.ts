export function useConsoleSession() {
  const router = useRouter()
  const loginState = ref({
    name: '',
    password: '',
  })
  const handleLogin = async () => {
    const res = await fetch('/api/v1/console/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginState.value),
    })
    if (res.ok) {
      router.push('/console/writing')
    } else {
      const { message } = await res.json()
      alert(message)
    }
  }
  const handleLogout = async () => {
    await fetch('/api/v1/console/logout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
    router.push('/login')
  }
  const checkSession = async () => {
    const res = await fetch('/api/v1/console/session', {
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
