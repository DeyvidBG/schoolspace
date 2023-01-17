import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./styles.module.css"
import { searchTeacherFields } from "./formsField"
import { Button, TextField } from "../../atoms"
import { yupResolver } from "@hookform/resolvers/yup"
import { userEmailSchema } from "../../../schema"
import { User } from "../../../model"
import { TeacherBox } from "../../molecules"
import { IdType } from "../../../model/shared-types"

interface ITeacherManagementProps {}

const TeacherManagement: FC<ITeacherManagementProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userEmailSchema) })
  const [teacherData, setTeacherData] = useState<any>(null)
  const [email, setEmail] = useState<string | null>(null)
  const didMount = useRef(0)

  useEffect(() => {
    if (didMount.current > 1) {
      getDataAboutTeacher()
    } else {
      didMount.current += 1
    }
  }, [email])

  const getDataAboutTeacher = async () => {
    const response = await fetch(
      `http://localhost:8000/schools/teacher/${email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    )
    const buffer = await response.json()
    setTeacherData(buffer)
  }

  const handleSearch = async (data: any) => {
    setEmail(data.email)
  }

  const handleAssignment = async (id: IdType) => {
    const response = await fetch(`http://localhost:8000/schools/assign/${id}`, {
      method: "PUT",
      headers: { authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
    })

    if (response.status === 204) {
      await getDataAboutTeacher()
    }
  }

  const handleDismissal = async (id: IdType) => {
    const response = await fetch(
      `http://localhost:8000/schools/dismiss/${id}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
      }
    )

    if (response.status === 204) {
      await getDataAboutTeacher()
    }
  }

  return (
    <>
      <div className={styles.header}>
        <form onSubmit={handleSubmit(handleSearch)}>
          {searchTeacherFields.map((field) => (
            <TextField
              key={field.fieldName}
              fieldName={field.fieldName}
              type={field.type}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
            />
          ))}
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
      </div>
      {teacherData && (
        <TeacherBox
          teacher={teacherData}
          onAssign={handleAssignment}
          onDismissal={handleDismissal}
        />
      )}
    </>
  )
}

export default TeacherManagement
