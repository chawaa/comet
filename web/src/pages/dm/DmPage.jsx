import MainSidebar from '@/components/sidebars/HomeSidebar'
import React from 'react'
import { useQuery, useSubscription } from 'urql'
import { useParams } from 'react-router-dom'
import SendMessageBar from '@/components/message/SendMessageBar'
import Message from '@/components/message/Message'
import { Virtuoso } from 'react-virtuoso'
import { GET_MESSAGES, GET_USER } from '@/graphql/queries'
import LoadingScreen from '@/pages/LoadingScreen'
import {
  MESSAGE_REMOVED,
  MESSAGE_SENT,
  MESSAGE_UPDATED
} from '@/graphql/subscriptions'
import DmHeader from '@/components/headers/DmHeader'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { page: 0, userId }
  })

  const messages = messagesData?.getMessages?.messages || []

  useSubscription({ query: MESSAGE_SENT })
  useSubscription({ query: MESSAGE_UPDATED })
  useSubscription({ query: MESSAGE_REMOVED })

  return (
    <>
      <DmHeader user={user} />
      <MainSidebar />

      <main className="pl-76 pt-12 h-full">
        <div className="h-full dark:bg-gray-750">
          <Virtuoso
            followOutput={isAtBottom =>
              isAtBottom ||
              messages.length === 0 ||
              messages[messages.length - 1].author.isCurrentUser
            }
            alignToBottom
            data={messages}
            overscan={200}
            className="scrollbar-thin scrollbar-thumb-gray-850 scrollbar-track-gray-775 scrollbar-thumb-rounded-md mr-1"
            style={{ height: 'calc(100% - 5.875rem)' }}
            itemContent={(index, message) => (
              <Message
                message={message}
                showUser={
                  index === 0 ||
                  messages[index - 1].author.id !== message.author.id
                }
              />
            )}
          />

          <SendMessageBar user={user} />
        </div>
      </main>
    </>
  )
}
