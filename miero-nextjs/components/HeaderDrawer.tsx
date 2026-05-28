'use client'

import { useState } from 'react'
import Header from './Header'
import Drawer from './Drawer'

export default function HeaderDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <Header onMenuOpen={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
