import { useState } from 'react'

function ProfileCard({ name, role, location, interests }) {
  const [likes, setLikes] = useState(0)

  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <p className="location">📍 {location}</p>
      <div className="interests">
        {interests.map((interest, index) => (
          <span key={index} className="tag">{interest}</span>
        ))}
      </div>
      <button className="like-btn" onClick={() => setLikes(likes + 1)}>
        ♥ {likes} {likes === 1 ? 'like' : 'likes'}
      </button>
    </div>
  )
}

export default ProfileCard