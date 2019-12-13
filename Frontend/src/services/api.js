export default {
	search: async (query) => {
		const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/person/search/${query}`, {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
					"Accept": "application/json",
        })
      }))
      return response.json()
  },
  fetchDetail: async (id) => {
      const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/person/detail/${id}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          "Accept": "application/json",
			})
		}))
		return response.json()
	},
  fetchNews: async (id) => {
      const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/person/news/${id}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          "Accept": "application/json",
			})
		}))
		return response.json()
	}
}
