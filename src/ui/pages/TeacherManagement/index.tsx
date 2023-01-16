import { FC, useState } from "react"
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

  const handleSearch = async (data: any) => {
    const response = await fetch(
      `http://localhost:8000/schools/teacher/${data.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    )
    const buffer = await response.json()
    console.log(buffer)
    setTeacherData(buffer)
  }

  const handleAssignment = async (id: IdType) => {
    console.log(id)
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
        <TeacherBox teacher={teacherData} onAssign={handleAssignment} />
      )}
    </>
  )
}

export default TeacherManagement
