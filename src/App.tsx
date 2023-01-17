import { createBrowserRouter } from "react-router-dom"
import { RequireAuth } from "./provider/AuthProvider"
import { Role } from "./model/shared-types"
import {
  Auth,
  AdminView,
  Lobby,
  Main,
  StudentView,
  SchoolView,
  TeacherView,
} from "./ui/views"
import {
  SignIn,
  SignUp,
  SignUpSchool,
  UserManagement,
  Requests,
  Timetable,
  Schools,
  SubjectManagement,
  TeacherManagement,
  RoomManagement,
} from "./ui/pages"

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "signupschool", element: <SignUpSchool /> },
    ],
  },
  {
    path: "/student",
    element: <StudentView />,
    children: [{ path: "schedule", element: <Timetable /> }],
  },
  {
    path: "/teacher",
    element: (
      <RequireAuth role={Role.Teacher}>
        <TeacherView />
      </RequireAuth>
    ),
    children: [
      {
        path: "classes",
        element: <h1>Classes</h1>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAuth role={Role.Admin}>
        <AdminView />
      </RequireAuth>
    ),
    children: [
      {
        path: "users",
        loader: async () => {
          const users = await fetch("http://localhost:8000/users", {
            method: "GET",
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
          return await users.json()
        },
        element: <UserManagement />,
        errorElement: <h1>Error found.</h1>,
      },
      {
        path: "schools",
        loader: async () => {
          const requests = await fetch(
            "http://localhost:8000/schools/verified",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
              },
            }
          )
          return await requests.json()
        },
        element: <Schools />,
      },
      {
        path: "requests",
        loader: async () => {
          const requests = await fetch(
            "http://localhost:8000/schools/unverified",
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
              },
            }
          )
          return await requests.json()
        },
        element: <Requests />,
      },
    ],
  },
  {
    path: "/school",
    element: (
      <RequireAuth role={Role.Principal}>
        <SchoolView />
      </RequireAuth>
    ),
    children: [
      {
        path: "subjects",
        loader: async () => {
          const requests = await fetch("http://localhost:8000/subjects/", {
            method: "GET",
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
          return await requests.json()
        },
        element: <SubjectManagement />,
      },
      { path: "teachers", element: <TeacherManagement /> },
      {
        path: "rooms",
        loader: async () => {
          const requests = await fetch("http://localhost:8000/schools/rooms", {
            method: "GET",
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
          return await requests.json()
        },
        element: <RoomManagement />,
      },
    ],
  },
  {
    path: "/lobby",
    element: (
      <RequireAuth role={Role.User}>
        <Lobby />
      </RequireAuth>
    ),
  },
  {
    path: "/not-authorized",
    element: <h1>403</h1>,
  },
])

export default router
