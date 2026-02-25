import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FC, useState } from 'react'

type AiInputProps = {
  isLoading: boolean
  onSubmit: (value: string) => void
  cancel: () => void
}

const AiInput: FC<AiInputProps> = ({ cancel, isLoading, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim()

    if (trimmedValue && !isLoading) {
      onSubmit(trimmedValue)
      setInputValue('') // Clear input after submission
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Input
        inputMode="text"
        placeholder="Type something..."
        style={{ flex: 1 }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        disabled={!inputValue.trim() && !isLoading}
        onClick={isLoading ? cancel : handleSubmit}
      >
        {isLoading ? 'Cancel' : 'Submit'}
      </Button>
    </div>
  )
}

export default AiInput
