import { useCallback, useState } from 'react'

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(
    (value?: boolean) => setValue((prevValue) => value ?? !prevValue),
    [],
  )

  return [value, toggle] as const
}

export default useToggle
