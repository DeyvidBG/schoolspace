import { FC, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { School } from "../../../model"
import { IdType } from "../../../model/shared-types"
import { SchoolBox } from "../../molecules"

interface ISchoolsProps {}

const Schools: FC<ISchoolsProps> = () => {
  const [schools, setSchools] = useState<School[]>(useLoaderData() as School[])

  useEffect(() => {}, [schools])

  const refreshData = async () => {
    const requests = await fetch("http://localhost:8000/schools/unverified", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
    setSchools(await requests.json())
  }

  const handleVerify = async (id: IdType) => {
    const response = await fetch("http://localhost:8000/schools/verify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ schoolId: id }),
    })

    if (response.status === 204) {
      refreshData()
    } else {
      alert("A problem occurred.")
    }
  }

  return (
    <>
      {schools.map((school) => (
        <SchoolBox school={school} onVerify={handleVerify} />
      ))}
    </>
  )
}

export default Schools
