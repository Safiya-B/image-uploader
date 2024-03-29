import Head from "next/head"
import { useState, useEffect } from "react"
import Image from "next/image"
import Uploaded from "../components/Uploaded"
import Uploader from "../components/Uploader"
import Uploading from "../components/Uploading"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [loadFile, setLoadfile] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(100)
  const [uploadedFile, setUploadedFile] = useState(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
        />
      </Head>
      <main className={styles.main}>
        {uploadedFile ? (
          <Uploaded
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        ) : (
          <Uploader
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        )}
      </main>
    </div>
  )
}
