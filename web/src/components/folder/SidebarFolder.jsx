import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import {
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/components/ui/icons/Icons'
import { useMemo } from 'react'
import { useMutation } from 'urql'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import { useFolderName } from '@/components/folder/useFolderName'
import { UPDATE_FOLDER } from '@/graphql/mutations'

export default function SidebarFolder({ folder, serverId }) {
  const [_addPostRes, addPostToFolder] = useMutation(UPDATE_FOLDER)
  const [canAddPosts] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.AddPostToFolder]
  })

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.Post,
    drop: async (post, monitor) => {
      if (serverId && !canAddPosts) {
        toast.error(t('folder.noPermission'))
        return
      }
      addPostToFolder({ folderId: folder.id, postId: post.id }).then(res => {
        if (!res.error) toast.success(t('folder.added', { name: folder.name }))
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop

  const { t } = useTranslation()

  const folderName = useFolderName(folder)

  const folderContents = useMemo(() => {
    if (folder.avatarUrl) {
      return (
        <>
          <div
            className="rounded-full h-7 w-7 mr-3 bg-center bg-contain"
            style={{ backgroundImage: `url(${folder.avatarUrl})` }}
          />
          <span className="truncate">{folderName}</span>
        </>
      )
    }

    if (!serverId && folder.name === 'Favorites')
      return (
        <>
          <IconFavoritesFolder className="w-5 h-5 ml-1 mr-4 text-yellow-500" />
          <span className="truncate">{folderName}</span>
        </>
      )

    if (!serverId && folder.name === 'Read Later')
      return (
        <>
          <IconReadLaterFolder className="w-5 h-5 ml-1 mr-4 text-blue-500" />
          <span className="truncate">{folderName}</span>
        </>
      )

    return (
      <>
        <IconFolder className="w-5 h-5 ml-1 mr-4" />
        <span className="truncate">{folder.name}</span>
      </>
    )
  }, [serverId, folder, folderName])

  return (
    <div>
      <ContextMenuTrigger data={{ type: ContextMenuType.Folder, folder }}>
        <SidebarItem
          active={isActive}
          to={`${
            serverId || folder.server
              ? `/server/${serverId ?? folder.server.id}`
              : '/me'
          }/folder/${folder.id}`}
          ref={dropRef}
        >
          {folderContents}
        </SidebarItem>
      </ContextMenuTrigger>
    </div>
  )
}
