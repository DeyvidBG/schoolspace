import { FC, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Subject } from "../../../model"
import { IdType } from "../../../model/shared-types"
import { SubjectBox } from "../../molecules"
import styles from "./styles.module.css"
import { addSubjectFields } from "./formFields"
import { subjectSchema } from "../../../schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField } from "../../atoms"
import { useForm } from "react-hook-form"

interface ISubjectManagementProps {}

const SubjectManagement: FC<ISubjectManagementProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(subjectSchema) })
  const [subjects, setSubjects] = useState<Subject[]>(
    useLoaderData() as Subject[]
  )

  useEffect(() => {}, [subjects])

  const refreshData = async () => {
    const response = await fetch("http://localhost:8000/subjects", {
      method: "GET",
      headers: { authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
    })
    const buffer = await response.json()
    setSubjects(buffer)
  }

  const handleAddSubject = async (data: any) => {
    const subject = data as Partial<Subject>
    const response = await fetch("http://localhost:8000/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        schoolId: subjects[0].schoolId,
        name: subject.name,
        description: subject.description,
      }),
    })

    if (response.status === 200) {
      await refreshData()
    }
  }

  const handleRemoveSubject = async (id: IdType) => {
    const response = await fetch(`http://localhost:8000/subjects/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
    })

    if (response.status === 204) {
      await refreshData()
    }
  }

  return (
    <>
      <div className={styles.header}>
        <form onSubmit={handleSubmit(handleAddSubject)}>
          {addSubjectFields.map((field) => (
            <TextField
              fieldName={field.fieldName}
              placeholder={field.placeholder}
              type={field.type}
              register={register}
              key={field.fieldName}
              errors={errors}
            />
          ))}
          <Button type="submit" variant="text" color="primary" width="20%">
            Add subject
          </Button>
        </form>
      </div>
      <div className={styles.subjectsContainer}>
        {subjects &&
          subjects.map((subject) => (
            <SubjectBox
              subject={subject}
              onRemove={handleRemoveSubject}
              key={subject.id}
            />
          ))}
      </div>
    </>
  )
}

export default SubjectManagement
