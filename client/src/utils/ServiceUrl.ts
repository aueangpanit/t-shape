const serviceBaseUrl = process.env.REACT_APP_SERVICE_URL

const urls = {
  GetAllTickets: '/ticket/all',
  GetTicket: '/ticket',
  CreateTicket: '/ticket/create'
}

const getServiceUrl = () => {
  const serviceUrl: Partial<typeof urls> = {}

  for (const [key, value] of Object.entries(urls)) {
    serviceUrl[key as keyof Partial<typeof urls>] = serviceBaseUrl + value
  }

  return serviceUrl
}

export const ServiceUrl = getServiceUrl() as typeof urls
