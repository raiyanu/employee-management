# Employee Management System

This is a simple employee management system built with Next.js , daisyUI and Tailwind CSS.
i may have mentioned that it is simple but it is not that simple, it is a fullstack application with a backend built with Node.js, MongodDB and Express.js and a frontend built with Next.js.
i may have used word frontend and backend for the sake of simplicity but the frontend is in the root directory and the backend is in the server directory nested in frontend. i did use word frontend and backend while some people may use client and server, i am not in any hope that you can understand.

incase project grows and becomes more complex, i will move the backend to a separate repository.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

<!-- ## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->

## Todo

- Host it somewhere and provide a link to the live version either vercel or github pages and Render
- Add a search bar and filter features
- a tasking system to assign tasks to employees
- Employee can login and request edit to their profile (raising ticket to admin)
  - Employee can edit their profile picture
  - Admin can approve or reject the request
  - Password reset request

## Backend Architecture

### Project structure

```bash
.
└───employee-management # root directory : frontend
    ├───.idx
    ├───.vscode
    ├───app
    │   ├───add
    │   ├───admin
    │   │   └───DashboardComponents
    │   ├───components
    │   ├───employees
    │   │   ├───components
    │   │   ├───edit
    │   │   │   └───[id]
    │   │   └───[pageNo]
    │   └───fonts
    ├───components
    │   └───ui
    ├───lib
    └───server # backend 
        ├───config
        ├───controllers
        ├───img
        ├───middleware
        ├───models
        ├───routes
        └───utils
        .env # environment variables required to server directory
    .env # environment variables required to root directory
```

### Environment Variables

**For server:**

- PORT
- MONGO_URI
- JWT_SECRET

**For root/frontend directory:**

- none for now

### Routes

- GET /api/employees
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id
- GET /api/employees/:id
- POST /api/user/login
- POST /api/user/register
- GET /api/user/logout
- GET /api/user/me

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. See the [LICENSE](./LICENSE) file for details.
