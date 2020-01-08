export default {
	search: async (query) => {
		const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/api/v1/person/search/${query}`, {
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
      const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/api/v1/person/detail/${id}`, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          "Accept": "application/json",
			})
		}))
		return response.json()
	},
  fetchNews: async (fullName, party, searchQuery) => {
      const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/api/v1/news/monitora`, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          "Accept": "application/json",
        }),
        body: JSON.stringify({"data": {
          "name": fullName,
          "party": party,
          "search_query": searchQuery,
        }})
    }))
    return response.json()
	},
	fetchDemagog: async (id) => {
			const response = await fetch(new Request(`${process.env.REACT_APP_BASE_API_URL}/api/v1/demagog/${id}`, {
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
