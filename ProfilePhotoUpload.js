import { useRef } from 'react'
import styles from '../styles/theme.module.css'

export default function ProfilePhotoUpload({ photo, setPhoto, isAdmin }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.photoSection}>
      <img
        src={photo || '/default-profile.png'}
        alt="Profile"
        className={styles.profilePhoto}
      />
      {isAdmin && (
        <div className={styles.photoEdit}>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileRef.current.click()} className={styles.photoBtn}>
            Upload/Change Photo
          </button>
        </div>
      )}
    </div>
  )
}