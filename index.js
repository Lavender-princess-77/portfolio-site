import Head from 'next/head'
import { useState } from 'react'
import EditableSection from '../components/EditableSection'
import AdminLogin from '../components/AdminLogin'
import ProfilePhotoUpload from '../components/ProfilePhotoUpload'
import styles from '../styles/theme.module.css'

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [sections, setSections] = useState({
    about: '',
    skills: [],
    education: [],
    certificates: [],
    experience: [],
    projects: [],
    contact: { email: '', phone: '', socials: {} }
  })

  return (
    <div className={styles.bg}>
      <Head>
        <title>Lavender Princess Portfolio</title>
        <meta name="description" content="Creative portfolio site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>Lavender Princess</h1>
        <AdminLogin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <ProfilePhotoUpload photo={profilePhoto} setPhoto={setProfilePhoto} isAdmin={isAdmin} />

        <EditableSection
          title="About Me"
          sectionKey="about"
          value={sections.about}
          isAdmin={isAdmin}
          onSave={v => setSections(s => ({ ...s, about: v }))}
        />

        <EditableSection
          title="Skills"
          sectionKey="skills"
          value={sections.skills}
          isAdmin={isAdmin}
          isList
          onSave={v => setSections(s => ({ ...s, skills: v }))}
        />

        <EditableSection
          title="Education"
          sectionKey="education"
          value={sections.education}
          isAdmin={isAdmin}
          isList
          onSave={v => setSections(s => ({ ...s, education: v }))}
        />

        <EditableSection
          title="Certificates"
          sectionKey="certificates"
          value={sections.certificates}
          isAdmin={isAdmin}
          isList
          onSave={v => setSections(s => ({ ...s, certificates: v }))}
        />

        <EditableSection
          title="Experience"
          sectionKey="experience"
          value={sections.experience}
          isAdmin={isAdmin}
          isList
          onSave={v => setSections(s => ({ ...s, experience: v }))}
        />

        <EditableSection
          title="Projects"
          sectionKey="projects"
          value={sections.projects}
          isAdmin={isAdmin}
          isList
          onSave={v => setSections(s => ({ ...s, projects: v }))}
        />

        <EditableSection
          title="Contact & Socials"
          sectionKey="contact"
          value={sections.contact}
          isAdmin={isAdmin}
          isContact
          onSave={v => setSections(s => ({ ...s, contact: v }))}
        />
      </main>
    </div>
  )
}