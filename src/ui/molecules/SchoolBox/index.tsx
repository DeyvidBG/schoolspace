import { FC } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.css"
import { School } from "../../../model"
import { Button, Typography } from "../../atoms"
import { IdType } from "../../../model/shared-types"

interface ISchoolBoxProps {
  school: School
  onVerify: (id: IdType) => Promise<void>
}

const SchoolBox: FC<ISchoolBoxProps> = ({ school, onVerify }) => {
  const verifySchool = () => {
    onVerify(school.id)
  }

  return (
    <div className={styles.schoolBox}>
      <div className={styles.innerContainer}>
        <Typography variant="h6">ID: {school.id}</Typography>
        <Typography variant="h6">Name: {school.name}</Typography>
      </div>
      <div className={styles.innerContainer}>
        <Typography variant="h6">
          <b>Principal:</b> {school.principalName}
        </Typography>
        <Typography variant="h6">
          <b>Vice principal:</b> {school.vicePrincipalName}
        </Typography>
      </div>
      <div className={styles.innerContainer}>
        <Typography variant="h6">
          <b>Country:</b> {school.country}
        </Typography>
        <Typography variant="h6">
          <b>City:</b> {school.city}
        </Typography>
        <Typography variant="h6">
          <b>Street:</b> {school.streetAddress}
        </Typography>
        <Typography variant="h6">
          <b>Zip code:</b> {school.zipCode}
        </Typography>
        <Typography variant="h6">
          <b>Website:</b> {school.website}
        </Typography>
        <Typography variant="h6">
          <b>Is verified:</b> {school.isVerified ? "YES" : "NO"}
        </Typography>
      </div>
      <div className={styles.innerContainer} style={{ display: "block" }}>
        <Typography variant="h6">
          <b>Welcome text:</b> {school.welcomeText}
        </Typography>
      </div>
      {school.isVerified !== 1 && (
        <div
          className={styles.innerContainer}
          style={{ justifyContent: "center" }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            width="50%"
            onClick={verifySchool}
          >
            Verify
          </Button>
        </div>
      )}
    </div>
  )
}

SchoolBox.propTypes = {
  school: PropTypes.instanceOf(School).isRequired,
  onVerify: PropTypes.func.isRequired,
}

export default SchoolBox
