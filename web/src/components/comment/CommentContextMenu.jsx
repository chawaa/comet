import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import { useParams } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useToggleCommentVote } from '@/components/comment/useToggleCommentVote'
import { useToggleCommentPin } from '@/components/comment/useToggleCommentPin'
import { useStore } from '@/hooks/useStore'

export default function CommentContextMenu({ comment, ContextMenuItem }) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const { serverId } = useParams()
  const setReplyingCommentId = useStore(s => s.setReplyingCommentId)
  const [canManageComments, canVote, canComment] = useHasServerPermissions({
    serverId,
    permissions: [
      ServerPermission.ManageComments,
      ServerPermission.VoteComment,
      ServerPermission.CreateComment
    ]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [_deleteRes, deleteComment] = useMutation(DELETE_COMMENT)
  const toggleVote = useToggleCommentVote(comment)
  const togglePin = useToggleCommentPin(comment)

  const isAuthor = comment.author.id === currentUser.id
  const canDelete = canManageComments || isAuthor
  return (
    <>
      <ContextMenuSection>
        {canVote && (
          <ContextMenuItem
            label={
              comment.isVoted
                ? t('comment.context.unvote')
                : t('comment.context.vote')
            }
            onClick={() => toggleVote()}
          />
        )}
        {isAuthor && <ContextMenuItem label={t('comment.context.edit')} />}
        {canManageComments && (
          <ContextMenuItem
            label={
              comment.isPinned
                ? t('comment.context.unpin')
                : t('comment.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}
        {canComment && (
          <ContextMenuItem
            onClick={() => setReplyingCommentId(comment?.id)}
            label={t('comment.context.reply')}
          />
        )}

        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${comment.id}`)
          }}
          label={t('comment.context.copyLink')}
        />
        {canDelete && (
          <ContextMenuItem
            label={t('comment.context.delete')}
            red
            onClick={() => toast.error(t('comment.context.deleted'))}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
