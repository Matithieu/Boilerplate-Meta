const LOCAL_STORAGE_PREFIX = 'web-' as const
type LocalStorageKeys = 'settings' | 'language'

/**
 * A generic service for managing localStorage with a specified prefix.
 *
 * @template T - The type of the value to be stored.
 */
export class StorageService<T> {
  private readonly prefix: string

  constructor(prefix: string = LOCAL_STORAGE_PREFIX) {
    this.prefix = prefix
  }

  setItem(key: LocalStorageKeys, value: T): void {
    const stringValue = JSON.stringify(value)
    localStorage.setItem(this.prefix + key, stringValue)
  }

  getItem(key: LocalStorageKeys): T | null {
    const value = localStorage.getItem(this.prefix + key)
    if (value === null) return null

    try {
      return JSON.parse(value) as T
    } catch (error) {
      throw new Error(
        `Failed to parse value for key "${key}": ${String(error)}`,
      )
    }
  }

  removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(this.prefix + key)
  }

  clear(): void {
    const keysToRemove = Object.keys(localStorage).filter((key) =>
      key.startsWith(this.prefix),
    )

    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
  }

  getAllItems(): Record<string, T> {
    const items: Record<string, T> = {}

    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key)

        if (value !== null) {
          try {
            const parsedValue = JSON.parse(value) as T
            const itemKey = key.substring(this.prefix.length)
            items[itemKey] = parsedValue
          } catch (error) {
            throw new Error(
              `Failed to parse value for key "${key}": ${String(error)}`,
            )
          }
        }
      }
    }

    return items
  }

  hasItem(key: LocalStorageKeys): boolean {
    return localStorage.getItem(this.prefix + key) !== null
  }
}
