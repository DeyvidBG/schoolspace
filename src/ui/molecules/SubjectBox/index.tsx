import { FC } from "react"
import PropTypes from "prop-types"
import { Subject } from "../../../model"
import styles from "./styles.module.css"
import { IdType } from "../../../model/shared-types"
import Typography from "./../../atoms/Typography/index"
import { Button } from "../../atoms"

interface ISubjectBoxProps {
  subject: Subject
  onRemove: (id: IdType) => Promise<void>
}

const SubjectBox: FC<ISubjectBoxProps> = ({ subject, onRemove }) => {
  const handleRemove = () => {
    onRemove(subject.id)
  }

  return (
    <div className={styles.subjectBox}>
      <div className={styles.innerContainer}>
        <Typography variant="h6">{subject.name}</Typography>
      </div>
      <div className={styles.innerContainer}>
        <Typography variant="h6">{subject.description}</Typography>
      </div>
      <div className={styles.innerContainer}>
        <Typography variant="h6">Added by: {subject.schoolName}</Typography>
      </div>
      <div className={styles.innerContainer}>
        <Button
          variant="contained"
          color="error"
          type="button"
          width="50%"
          onClick={handleRemove}
        >
          Delete subject
        </Button>
      </div>
    </div>
  )
}

SubjectBox.propTypes = {
  subject: PropTypes.instanceOf(Subject).isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default SubjectBox
