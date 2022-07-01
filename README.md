# Personio-ui

The project goal is to display and manage all the relevant candidate information.
The data is obtained from [Personio API](https://personio-fe-test.herokuapp.com/api/v1/candidates), and allows recruiters to see a list of candidates, filter this list by candidate Name, Status and Position, and sort the data by Years of experience, Position applied and Applied date. 

The selected filters and sort option are saved on the URL, in order to share the saved filters.

## Project Set-up
For security reasons and to avoid exposing sensitive data, the REACT_APP_BASE_URL_DOMAIN is set in a .env file, so to run the project locally you have to create the .env file and set the values as follows:

```bash
REACT_APP_BASE_URL_DOMAIN=http://personio-fe-test.herokuapp.com 
```

## Steps to run Locally
1. Clone repo to local machine 
2. Run `npm install` to install dependencies
3. Create `.env` file on the root folder and add values for BASE_API_DOMAIN
4. Run `npm start`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## To run Cypress tests
1. Run `npm run cypress:open`. It will launch the cypress app (check https://www.cypress.io/ for more details)
2. Select E2E testing
3. Start testing in Chrome
4. Select `applications.cy.ts` spec to open and run tests


## Tech stack

- HTTP Client: [Axios](https://axios-http.com/)
- JS Framework : [React](https://reactjs.org/)
- E2E Test: [Cypress](https://www.cypress.io/)
- Material UI icons: [Material UI](https://mui.com/material-ui/material-icons/)
- MomentJS: [MomentJS](https://momentjs.com/)
- Typescript: [Typescript](https://www.typescriptlang.org/)
- Emotion CSS: [Emotion](https://emotion.sh/docs/introduction)
- React Router: [Router](https://reactrouter.com/)

---

### Improvements
- Change pagination strategy to be a infinity scroll 
    - Use React Virtual library to virtualize list 
- Handle errors
- Improve UI 
- Improve API to limit the data returned, instead off returning all the candidates and then build the pagination component 
- Improve flaky tests
