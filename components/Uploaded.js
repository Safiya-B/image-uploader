import Image from "next/image"
import React, { useState, useEffect } from "react"
import styles from "./Uploader.module.css"
import useCopyToClipboard from "../hooks/useCopyToClipboard"

const Uploaded = ({ uploadedFile, setUploadedFile }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(uploadedFile.secure_url)
  const buttonText = "Copy url"

  if (copyUrlStatus === "copied") buttonText = "copied !"
  else if (copyUrlStatus === "failed") buttonText = "copy failed"

  return (
    <div>
      <div className={styles.uploadedCard}>
        <span className={styles.materialIcons}>check_circle</span>
        <h2 className={styles.uploadedTitle}>Uploaded Successfully !</h2>
        <div className={styles.imageArea}>
          <Image
            src={uploadedFile.secure_url}
            layout="fill"
            objectFit="cover"
            className={styles.uploadedImg}
            alt="uploaded-image"
          />
        </div>
        <div className={styles.uploadedFooter}>
          <div className={styles.imageLink}>
            <p className={styles.linkInput}>{uploadedFile.secure_url}</p>
            <button className={styles.copyBtn} onClick={copyUrl}>
              {buttonText}
            </button>
          </div>
          <div
            className={styles.gobackDiv}
            onClick={() => setUploadedFile(null)}
          >
            <span
              className={styles.backArrow + " " + "material-symbols-outlined"}
            >
              arrow_back
            </span>
            <div>Go back</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uploaded
