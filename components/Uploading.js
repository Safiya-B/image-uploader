import React from "react"
import styles from "./Uploader.module.css"

const Uploading = ({ uploadPercentage, setUploadPercentage }) => {
  return (
    <div>
      <div className={styles.uploadingCard}>
        <h2 className={styles.cardTitle}>Uploading...</h2>
        <div className={styles.progressWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${uploadPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Uploading
