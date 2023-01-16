import { FC, useEffect, useRef, useState } from "react"
import { User } from "../../../model"
import { Button, FlexBox, Typography } from "../../atoms"
import styles from "./styles.module.css"
import { Gender, IdType, Role } from "../../../model/shared-types"

interface IUserBoxProps {
  user: User
  onDeleted: () => Promise<void>
  onEdit: (userToEdit: User) => void
  onMakeAdmin: (id: IdType) => Promise<void>
}

const UserBox: FC<IUserBoxProps> = ({
  user,
  onDeleted,
  onEdit,
  onMakeAdmin,
}) => {
  const handleEdit = () => {
    user && onEdit(user)
  }

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/users/${user!.id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })

    if (response.status === 204) {
      onDeleted()
    } else {
      alert("Changing users role is not doable now.")
    }
  }

  const makeAdmin = () => {
    onMakeAdmin(user.id)
  }

  return (
    <div className={styles.outerContainer}>
      {user === null ? (
        <Typography variant="h3">This user has been deleted.</Typography>
      ) : (
        <>
          <FlexBox
            style={{
              width: "100%",
              borderBottom: "0.125rem solid var(--grey)",
              padding: "1rem 0",
            }}
          >
            <Typography variant="h6">ID: {user.id}</Typography>
            <Typography variant="h6">
              Name: {user.firstName} {user.lastName}
            </Typography>
          </FlexBox>
          <div className={styles.innerContainer}>
            <Typography variant="subheading1">
              <b>First Name:</b> {user.firstName}
            </Typography>
            <Typography variant="subheading1">
              <b>Middle Name:</b> {user.middleName}
            </Typography>
            <Typography variant="subheading1">
              <b>Last Name:</b> {user.lastName}
            </Typography>
            <Typography variant="subheading1">
              <b>Birth date:</b>
              {new Date(user.birthDate).toISOString().split("T")[0]}
            </Typography>
            <Typography variant="subheading1">
              <b>Gender:</b> {Gender[user.gender]}
            </Typography>
            <Typography variant="subheading1">
              <b>Role:</b> {Role[user.role]}
            </Typography>
          </div>
          <div className={styles.innerContainer}>
            <Typography variant="subheading1">
              <b>Email:</b> {user.email}
            </Typography>
            <Typography variant="subheading1">
              <b>Phone number:</b> {user.phoneNumber}
            </Typography>
          </div>
          <div className={styles.innerContainer}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              width="25%"
              onClick={handleEdit}
            >
              Edit User
            </Button>
            {user.role !== Role.Admin && (
              <Button
                type="button"
                variant="contained"
                color="info"
                width="25%"
                onClick={makeAdmin}
              >
                Make Admin
              </Button>
            )}
            <Button
              type="button"
              variant="contained"
              color="error"
              width="25%"
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserBox
