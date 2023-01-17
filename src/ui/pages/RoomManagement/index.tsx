import { yupResolver } from "@hookform/resolvers/yup"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Room } from "../../../model"
import { IdType } from "../../../model/shared-types"
import { addRoomSchema } from "../../../schema"
import { Button, TextField } from "../../atoms"
import { RoomBox } from "../../molecules"
import { addRoomFields } from "./formFields"
import styles from "./styles.module.css"
import { useLoaderData } from "react-router-dom"

interface IRoomManagementProps {}

const RoomManagement: FC<IRoomManagementProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addRoomSchema) })
  const [rooms, setRooms] = useState<Room[] | null>(useLoaderData() as Room[])

  const getAllRooms = async () => {
    const requests = await fetch("http://localhost:8000/schools/rooms", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
    setRooms(await requests.json())
  }

  const handleAddRoom = async (data: any) => {
    const response = await fetch(`http://localhost:8000/schools/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    })

    if (response.status === 204) {
      await getAllRooms()
    }
  }

  const handleRemoveRoom = async (id: IdType) => {
    const response = await fetch(`http://localhost:8000/schools/rooms/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
    })

    if (response.status === 204) {
      await getAllRooms()
    }
  }

  return (
    <>
      <div className={styles.header}>
        <form onSubmit={handleSubmit(handleAddRoom)}>
          {addRoomFields.map((field) => (
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
            Add Room
          </Button>
        </form>
      </div>
      {rooms &&
        rooms.map((room) => (
          <RoomBox room={room} onRemove={handleRemoveRoom} key={room.id} />
        ))}
    </>
  )
}

export default RoomManagement
