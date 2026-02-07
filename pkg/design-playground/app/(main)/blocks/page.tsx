import { Suspense } from 'react'
import { BlocksPageContent } from './blocks-page-content'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BlocksPageContent />
    </Suspense>
  )
}

