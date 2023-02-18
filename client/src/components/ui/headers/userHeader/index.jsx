import React from 'react'
import { Avatar } from 'components/ui/avatar'

export const UserHeader = ({ children }) => {
  return (
    <div className='userheader authorheader contentbody'>
      {children}
    </div>
  )
}
