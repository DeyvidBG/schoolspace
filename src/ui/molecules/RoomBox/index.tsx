import { FC } from "react"
import { Room } from "../../../model"
import { IdType } from "../../../model/shared-types"
import { Button, Typography } from "../../atoms"
import styles from "./styles.module.css"

interface IRoomBoxProps {
  room: Room
  onRemove: (id: IdType) => Promise<void>
}

const RoomBox: FC<IRoomBoxProps> = ({ room, onRemove }) => {
  const handleRemoveRoom = () => {
    onRemove(room.id)
  }

  return (
    <div className={styles.roomBox}>
      <Typography variant="h6">
        <b>Room name:</b> {room.name}
      </Typography>
      <Typography variant="h6">
        <b>Room capacity:</b> {room.capacity}
      </Typography>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleRemoveRoom}
      >
        Remove Room
      </Button>
    </div>
  )
}

export default RoomBox
