import './css/app.css'
import './css/tippy.css'
import './css/editor.css'

import React from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Router from '@/Router'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@/graphql/urqlClient'
import ResponsiveToaster from '@/components/ResponsiveToaster'
import { UserProvider } from '@/components/providers/UserProvider'

export default function App() {
  return (
    <>
      <ResponsiveToaster />
      <UrqlProvider value={urqlClient}>
        <UserProvider>
          <DndProvider backend={HTML5Backend}>
            {window.electron && <TitleBar />}
            <div id="popup" />
            <div className={`h-full electron:pt-5.5`}>
              <Router />
            </div>
          </DndProvider>
        </UserProvider>
      </UrqlProvider>
    </>
  )
}
