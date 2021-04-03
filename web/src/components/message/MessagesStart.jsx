import UserAvatar from '@/components/user/UserAvatar'
import { IconChannel, IconUsers } from '@/components/ui/icons/Icons'

export default function MessagesStart({ user, channel, group, show = false }) {
  return (
    <div
      className={`px-4 flex items-end min-h-screen ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div>
        {!!user && (
          <>
            <UserAvatar user={user} size={20} />
            <div className="text-3xl font-bold pt-4 text-primary">
              {user.name}
            </div>
            <div className="pt-2 text-tertiary select-none text-base">
              This is the beginning of your direct message history with{' '}
              <span className="font-semibold">@{user.name}</span>
            </div>
          </>
        )}

        {!!channel && (
          <>
            <div className="rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700">
              <IconChannel className="w-2/3 h-2/3 text-primary" />
            </div>
            <div className="text-3xl font-bold pt-4 text-primary">
              Welcome to #{channel.name}!
            </div>
            <div className="pt-2 text-tertiary select-none text-base">
              This is the start of the #{channel.name} channel.
            </div>
          </>
        )}

        {!!group && (
          <>
            <div className="rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700">
              <IconUsers className="w-2/3 h-2/3 text-primary" />
            </div>
            <div className="text-3xl font-bold pt-4 text-primary">
              {group.name}
            </div>
            <div className="pt-2 text-tertiary select-none text-base">
              Welcome to the beginning of the{' '}
              <span className="font-semibold">{group.displayName}</span> group.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
