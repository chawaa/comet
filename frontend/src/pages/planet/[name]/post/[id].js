import { QueryClient } from 'react-query'
import { dehydrate } from '@/lib/dehydrate'
import { fetchPost, usePost } from '@/lib/usePost'
import { useRouter } from 'next/router'
import Post from '@/components/post/Post'
import { fetchComments, useComments } from '@/lib/useComments'
import { FiCopy } from 'react-icons/fi'
import React, { useState } from 'react'
import Comment from '@/components/Comment'
import Tippy from '@tippyjs/react'
import { useCopyToClipboard } from 'react-use'
import Image from 'next/image'

export default function PlanetPage() {
  const router = useRouter()
  const post = usePost({ postId: router.query.id }).data
  const comments = useComments({ postId: router.query.id }).data

  return (
    <div className="relative mycontainer">
      <CommentBox />

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 relative py-3">
          <div>
            <Post post={post} className="rounded-2xl" />

            {comments.map((comment, index) => (
              /*<div key={index}>{JSON.stringify(comment)}</div>*/
              <Comment comment={comment} key={comment.id} />
            ))}

            {comments.length > 0 && <div className="h-64" />}
          </div>
        </div>

        <div className="col-span-1">
          <div className="sticky top-14 pt-3">
            <div className="card mb-3">
              <div className="w-full h-12 relative">
                {post.planet.bannerUrl ? (
                  <Image
                    src={post.planet.bannerUrl}
                    layout="fill"
                    className="object-cover object-center rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-400 to-blue-500" />
                )}
              </div>

              <div className="p-3">
                <div className="flex">
                  <div className="h-12 w-12 relative rounded-full">
                    <Image
                      src={post.planet.avatarUrl}
                      layout="fill"
                      className="rounded-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-3">
                    <div className="font-medium text-primary">
                      {post.planet.name}
                    </div>

                    <div className="text-secondary text-sm">
                      {post.planet.profile.description}
                    </div>
                  </div>

                  <div className="ml-auto px-4 h-7 rounded-full bg-blue-500 text-sm inline-flex items-center cursor-pointer transition hover:bg-blue-600">
                    Join
                  </div>
                </div>
              </div>
            </div>

            <ShareCard post={post} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShareCard({ post }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  const copyLink = `https://cometx.io${post.relativeUrl}`

  const [copyTip, setCopyTip] = useState('Copy post link')

  const copy = () => {
    copyToClipboard(copyLink)
    setCopyTip('Copied post link!')
    setTimeout(() => setCopyTip('Copy post link'), 3000)
  }

  return (
    <div className="card p-3">
      <div className="font-medium text-secondary">Share Post</div>
      <Tippy content={copyTip}>
        <div
          onClick={() => copy()}
          className="mt-3 p-3 dark:bg-gray-900 rounded text-sm flex items-center text-accent cursor-pointer"
        >
          {copyLink}

          <div className="ml-auto">
            <FiCopy className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </Tippy>
    </div>
  )
}

function CommentBox() {
  return (
    <div className="fixed bottom-0 left-0 right-0 ml-64 z-10">
      <div className="relative mycontainer">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="transform translate-y-1/2 transition focus-within:translate-y-0 bg-white dark:bg-gray-700 rounded-t-xl p-3 shadow-2xl z-10">
              <textarea
                placeholder="Write a comment..."
                className="h-24 py-3 px-3 text-sm rounded-md w-full dark:bg-gray-700 resize-none border-none placeholder-tertiary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['post', { postId: ctx.query.id }], key =>
    fetchPost(key, ctx)
  )

  await queryClient.prefetchQuery(['comments', { postId: ctx.query.id }], key =>
    fetchComments(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
