const handleStatusError = async (response: Response, message: string) => {
  switch (response.status) {
    case 401:
      return 'Unauthorized'

    case 403:
      return 'Forbidden'

    case 409:
      return 'Subscription Error'

    case 429:
      return 'Too Many Requests'

    default:
      return `${response.status}: Failed to fetch data. ${message}`
  }
}

export default handleStatusError
