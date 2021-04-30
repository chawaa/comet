import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import GroupUsersSidebar from '@/pages/me/group/GroupUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { useGroup } from '@/hooks/graphql/useGroup'
import { IconUsers } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'

export default function GroupPage() {
  const { groupId } = useParams()
  useSetHomePage(`group/${groupId}`)
  const group = useGroup(groupId)
  return (
    <Page
      header={
        <Header
          icon={<IconUsers className="w-5 h-5 text-primary" />}
          title={group.displayName}
        >
          <ShowUsersButton />
        </Header>
      }
      rightSidebar={<GroupUsersSidebar users={group.users} />}
    >
      {!!group && <Messages group={group} users={group.users} />}
    </Page>
  )
}
