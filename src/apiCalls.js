export const fetchAllArticles = async () => {
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=75f1498e264443e29a8f911a399a7133&pageSize=100')
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.message)
      }
    })
    .then(data => data)
    .catch(error => {
      throw new Error(error)
    })
  
  }