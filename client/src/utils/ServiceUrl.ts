const serviceBaseUrl = process.env.REACT_APP_SERVICE_URL

const urls = {
  GetAllTickets: '/ticket/all',
  GetTicket: (id: string) => `/ticket/${id}`,
  GetTicketSolutions: (id: string) => `/ticket/${id}/solutions`,
  CreateTicket: '/ticket/create',
  UpdateTicket: '/ticket/update',
  DeleteTicket: '/ticket/delete',
  Login: '/auth/authenticate',
  Register: '/auth/register',
  GetAllUsers: '/user/all',
  CreateSolution: '/solution/create',
  UpdateSolution: (id: string) => `/solution/update/${id}`,
  DeleteSolution: '/solution/delete'
}

const getServiceUrl = () => {
  const serviceUrl: Partial<typeof urls> = {}

  for (const [key, value] of Object.entries(urls)) {
    serviceUrl[key as keyof Partial<typeof urls>] =
      typeof value === 'function'
        ? (((params: any) => serviceBaseUrl + value(params)) as any)
        : serviceBaseUrl + value
  }

  return serviceUrl
}

export const ServiceUrl = getServiceUrl() as typeof urls
