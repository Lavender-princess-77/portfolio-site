import { useState } from 'react'
import styles from '../styles/theme.module.css'

export default function EditableSection({
  title,
  sectionKey,
  value,
  isAdmin,
  onSave,
  isList = false,
  isContact = false
}) {
  const [editMode, setEditMode] = useState(false)
  const [input, setInput] = useState(value)

  const handleSave = () => {
    setEditMode(false)
    onSave(input)
  }

  let sectionContent
  if (isList) {
    sectionContent = (
      <ul>
        {(Array.isArray(value) ? value : []).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )
  } else if (isContact) {
    sectionContent = (
      <div>
        <div>Email: {value.email}</div>
        <div>Phone: {value.phone}</div>
        <div>
          Socials: {value.socials && Object.entries(value.socials).map(([k, v]) => (
            <a key={k} href={v} target="_blank" rel="noopener noreferrer">{k}</a>
          ))}
        </div>
      </div>
    )
  } else {
    sectionContent = <p>{value}</p>
  }

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {isAdmin && !editMode && (
        <button className={styles.editBtn} onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}
      {editMode && isAdmin ? (
        <div>
          {isList ? (
            <textarea
              value={Array.isArray(input) ? input.join('\n') : ''}
              onChange={e => setInput(e.target.value.split('\n'))}
              rows={5}
              className={styles.input}
            />
          ) : isContact ? (
            <div>
              <input
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={e => setInput(i => ({ ...i, email: e.target.value }))}
                className={styles.input}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={input.phone}
                onChange={e => setInput(i => ({ ...i, phone: e.target.value }))}
                className={styles.input}
              />
              <textarea
                placeholder="Socials - format: platform:url, one per line"
                value={
                  input.socials
                    ? Object.entries(input.socials)
                        .map(([k, v]) => `${k}:${v}`)
                        .join('\n')
                    : ''
                }
                onChange={e => {
                  const socials = {}
                  e.target.value.split('\n').forEach(line => {
                    const [k, v] = line.split(':')
                    if (k && v) socials[k.trim()] = v.trim()
                  })
                  setInput(i => ({ ...i, socials }))
                }}
                rows={3}
                className={styles.input}
              />
            </div>
          ) : (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={4}
              className={styles.input}
            />
          )}
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        sectionContent
      )}
    </section>
  )
}