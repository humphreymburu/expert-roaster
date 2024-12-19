"use client"

import usePageTitle from '@expo/hooks/usePageTitle';
import React from 'react'


export function TopTitle() {
  const title = usePageTitle();

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
}