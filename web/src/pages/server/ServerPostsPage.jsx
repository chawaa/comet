import React from 'react'
import Posts from '@/components/post/Posts'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import { useParams } from 'react-router-dom'
import PostsHeader from '@/components/headers/PostsHeader'
import { useStore } from '@/lib/stores/useStore'

export default function ServerPostsPage() {
  const { serverId } = useParams()
  const { showFolders } = useStore()

  return (
    <>
      <PostsHeader />
      <FoldersSidebar show={showFolders} />
      <div className={`h-full pl-76 pt-12 ${showFolders ? 'pr-60' : 'pr-0'}`}>
        <div className="h-full dark:bg-gray-750">
          <Posts variables={{ serverId }} />
        </div>
      </div>
    </>
  )
}
