import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAxios } from "../hooks"
import { UserProfile } from "./UserProfile"
import { UserPosts } from "./posts"
import { AlbumList } from "./albums"
import "../styles/styles.scss"

interface UserDetailsProps {
  [key: string]: any
}

export const UserDetails: FC<UserDetailsProps> = () => {
  const { id } = useParams()
  const { data: user } = useAxios({
    url: `users/${id}`,
  })

  return (
    <div className="container">
      <div className="userDetailsContainer">
        <UserProfile user={user} />
      </div>
      <div className="userPostsContainer">
        <UserPosts userId={id} />
      </div>
      <div className="userAlbumsContainer">
        <AlbumList userId={id} />
      </div>
    </div>
  )
}
