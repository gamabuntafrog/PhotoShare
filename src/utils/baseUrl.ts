const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const baseUrl = isDevelopment ? 'http://localhost:3001' : 'https://photosharebackend.up.railway.app'

export default baseUrl