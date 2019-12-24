# user-expense-reimbursement-ui

## _N.B_

> This branch has the `<json-server>` package to host a minimal json file for local database testing.
> It's a handy tool.

To run:

1 Switch over to the `ui-plus-server` branch

```bash
git branch ui-plus-server
```

2 Download additional `<json-server>` dependency for this repository

```bash
npm install
```

3 Run the `json-server.json` in a separate process. Easiest method is to open another bash shell :shell:

```bash
npm run server
```

4 The server will be running on _port_:5000. Then, change to the original bash shell, build, and start the React app.

```bash
npm run build && npm run start
```

5 What will you create next?

---

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- [React documentation](https://reactjs.org/).
