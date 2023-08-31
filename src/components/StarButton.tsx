import React from 'react'
import { Button } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'


type Props = {
  isFavourite: Boolean,
  onClick: () => void
}

export function StarButton({isFavourite, onClick}: Props) {
  return (
    <Button icon={isFavourite ? <StarFilled /> : <StarOutlined/>} onClick={onClick}/>
  )
}
