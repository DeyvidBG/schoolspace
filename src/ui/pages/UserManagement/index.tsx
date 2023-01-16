import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useLoaderData } from "react-router-dom"
import { User } from "../../../model/User"
import {
  Button,
  FlexBox,
  Modal,
  SelectField,
  TextField,
  Typography,
} from "../../atoms"
import { UserBox } from "../../molecules"
import styles from "./styles.module.css"
import { Field, IdType, Role } from "../../../model/shared-types"
import RefreshIcon from "@mui/icons-material/Refresh"
import { editUserFields, filterFields } from "./formFields"
import { useMediaQuery } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSignUpSchema } from "../../../schema"

interface IUserManagementProps {}

const UserManagement: FC<IUserManagementProps> = () => {
  const {
    register,
    handleSubmit: handleSubmitForm1,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSignUpSchema) })
  const { register: registerFilter, handleSubmit: handleSubmitFilter } =
    useForm()
  const [users, setUsers] = useState<User[]>(useLoaderData() as User[])
  const [filteredUser, setFilteredUser] = useState<User[]>(
    useLoaderData() as User[]
  )
  const [activeUserId, setActiveUserId] = useState<IdType | null>(null)
  const [filter, setFilter] = useState<Role | 0>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fields, setFields] = useState<Field[] | null>(null)
  const matches = useMediaQuery("(max-width: 768px)")

  const updateUsers = () => {
    filter === 0
      ? setFilteredUser(users)
      : setFilteredUser(users.filter((user) => user.role === filter))
  }

  useEffect(() => {
    updateUsers()
    fields?.forEach((field) => {
      if (field.fieldName !== "password") {
        setValue(field.fieldName, field.value, { shouldValidate: true })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, fields, users])

  const changeFilter = (data: any) => {
    setFilter(+data.role)
  }

  const refreshData = async () => {
    const response = await fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
    const buffer = await response.json()
    setUsers(buffer)
    updateUsers()
  }

  const handleOpenModal = (userToEdit: User) => {
    setActiveUserId(userToEdit.id)
    setFields(
      editUserFields.map((field) => ({
        ...field,
        value: userToEdit[field.fieldName as keyof User],
      }))
    )
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUserEdit = async (data: any) => {
    const userDTO = data as Omit<User, "id">
    const response = await fetch(
      `http://localhost:8000/users/${activeUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(userDTO),
      }
    )

    if (response.status === 204) {
      refreshData()
      setValue("password", "")
      updateUsers()
      setIsModalOpen(false)
    }
  }

  const handleMakeAdmin = async (id: IdType) => {
    const response = await fetch("http://localhost:8000/users/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ userId: id }),
    })

    if (response.status === 204) {
      refreshData()
      updateUsers()
    }
  }

  const handleDeleted = async () => {
    await refreshData()
    updateUsers()
  }

  return (
    <>
      {isModalOpen && (
        <Modal onClick={handleCloseModal}>
          <Typography variant="h2" style={{ fontFamily: "Varino" }}>
            EDIT INFO
          </Typography>
          <form
            style={{ flexWrap: "wrap", width: "100%" }}
            onSubmit={handleSubmitForm1(handleUserEdit)}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {fields?.map((field, index) =>
                field.type === "select" ? (
                  <SelectField
                    fieldName={field.fieldName}
                    placeholder={field.placeholder}
                    register={register}
                    isRequired={true}
                    options={field.options!}
                    disabled={field.disabled ? true : false}
                    key={field.fieldName}
                  />
                ) : (
                  <TextField
                    fieldName={field.fieldName}
                    placeholder={field.placeholder}
                    type={field.type}
                    register={register}
                    key={field.fieldName}
                    disabled={field.disabled ? true : false}
                    errors={errors}
                  />
                )
              )}
            </div>

            <Button
              variant="outlined"
              type="submit"
              width={matches ? "95%" : "25%"}
              color="secondary"
              style={{ alignSelf: "center" }}
            >
              Edit User Info
            </Button>
          </form>
        </Modal>
      )}
      <div className={styles.header}>
        <form onSubmit={handleSubmitFilter(changeFilter)}>
          <FlexBox>
            {filterFields.map((filterField, index) => (
              <SelectField
                fieldName={filterField.fieldName}
                placeholder={filterField.placeholder}
                register={registerFilter}
                options={filterField.options!}
                isRequired={true}
                style={{ margin: "0" }}
                key={index}
              ></SelectField>
            ))}
            <Button type="submit" variant="text" color="primary">
              Sort
            </Button>
          </FlexBox>
        </form>
        <RefreshIcon sx={{ cursor: "pointer" }} onClick={refreshData} />
      </div>
      {filteredUser.map((user) => {
        return (
          <UserBox
            user={user}
            onDeleted={handleDeleted}
            onEdit={handleOpenModal}
            onMakeAdmin={handleMakeAdmin}
            key={user.id}
          />
        )
      })}
    </>
  )
}

export default UserManagement
