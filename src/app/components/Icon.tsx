import React from 'react';

type Props = {
  name: string,
  icon: {
    viewBox?: string,
    path?: string
  }
}

export default function Icon({ name, icon }: Props) {
  return (
    <svg viewBox={icon.viewBox}>
      <title>{name}</title>
      <path d={icon.path} />
    </svg>
  )
}