import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import dropImage from "../public/image.svg"
import React from "react"
import styles from "./Uploader.module.css"
import Uploading from "./Uploading"

const Uploader = ({ setUploadedFile }) => {
  const [file, setFile] = useState("")
  const [dropareaActive, setdropareaActive] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const $input = useRef(null)

  const handleSetFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmitFile = async (e) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "v97lcuvz")

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/{myfoldername}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            )
            setTimeout(() => setUploadPercentage(0), 10000)
          },
        }
      )

      setUploadedFile(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setFile(e.dataTransfer.files[0])
  }
  return (
    <div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Upload your image</h2>
        {file ? (
          uploadPercentage > 0 ? (
            <Uploading uploadPercentage={uploadPercentage} />
          ) : (
            <div className={styles.fileCard}>
              <div className={styles.filenameCard}>
                <span
                  className={`${styles.imageIcon} material-symbols-outlined`}
                >
                  image
                </span>
                <span className={styles.fileName}>{file.name}</span>
              </div>
              <button className={styles.uploadBtn} onClick={handleSubmitFile}>
                <span className="material-symbols-outlined">file_upload</span>
                <span>Upload</span>
              </button>
            </div>
          )
        ) : (
          <div>
            <h3 className={styles.cardSubtitle}>
              File should be Jpeg, Png,...
            </h3>
            <div
              className={
                dropareaActive
                  ? `${styles.dropArea} ${styles.activeArea}`
                  : `${styles.dropArea}`
              }
              onDragOver={(e) => {
                e.preventDefault()
                setdropareaActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setdropareaActive(false)
              }}
              onDrop={(e) => handleDrop(e)}
            >
              <Image
                src={dropImage}
                alt="drop-area image"
                className={styles.dropImage}
              />
              <h2 className={styles.dropText}>Drag & Drop your image here </h2>
            </div>
            <div className={styles.cardBottom}>
              <h2 className={styles.dropText}>Or</h2>
              <input
                type="file"
                className={styles.fileInput}
                accept="image/*"
                ref={$input}
                onChange={handleSetFile}
              />
              <button
                className={styles.btn}
                onClick={() => {
                  $input.current.click()
                }}
              >
                Choose a file
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Uploader
