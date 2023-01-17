import { FC } from "react"
import { User } from "../../../model"
import { IdType } from "../../../model/shared-types"
import { Button, Typography } from "../../atoms"
import styles from "./styles.module.css"

interface ITeacherBoxProps {
  teacher: any
  onAssign: (id: IdType) => Promise<void>
  onDismissal: (id: IdType) => Promise<void>
}

const TeacherBox: FC<ITeacherBoxProps> = ({
  teacher,
  onAssign,
  onDismissal,
}) => {
  const handleAssignment = () => {
    onAssign(teacher.id)
  }

  const handleDismissal = () => {
    onDismissal(teacher.id)
  }

  return (
    <div className={styles.teacherBox}>
      <div className={styles.innerContainer}>
        <Typography variant="h6">
          <b>Name:</b> {teacher.firstName} {teacher.middleName}{" "}
          {teacher.lastName}
        </Typography>
        {teacher.status === 1 && (
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={handleDismissal}
          >
            Remove from school
          </Button>
        )}
        {teacher.status === 0 && (
          <Button
            type="button"
            variant="contained"
            color="info"
            onClick={handleAssignment}
          >
            Assign to this school
          </Button>
        )}
      </div>
      {teacher.status === 2 && (
        <div className={styles.innerContainer}>
          <Typography variant="h6">
            Teacher works for another school: {teacher.schoolName}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default TeacherBox
