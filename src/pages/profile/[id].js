import React from 'react'
import { useRouter } from 'next/router'

function ProfileById() {
    const router = useRouter()
  return (
    <div>ProfileById {router.query.id}</div>
  )
}

export default ProfileById