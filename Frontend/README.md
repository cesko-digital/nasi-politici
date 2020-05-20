Frontend created with [Create React App](https://github.com/facebook/create-react-app).

[Readme for Create React App](./README_CREATE_APP.md)

You can **start the application in 2 ways:
* To use **live server**, create a .env file with `REACT_APP_BASE_API_URL` (e.g. `REACT_APP_BASE_API_URL=http://localhost:5001`)

**OR**

* To use **mock data**, set up your .evn file with `REACT_APP_USE_API_MOCK=1`

**OR by Docker**

```
docker build -t nasi-politici .
docker run -ti --rm -p 5001:5001 nasi-politici
```

