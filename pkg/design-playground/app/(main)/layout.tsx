import React, { Suspense } from 'react'
import PlaygroundShell from '../playground-shell'
import PlaygroundToaster from '../playground-toaster'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PlaygroundShell>{children}</PlaygroundShell>
            {/* Static export requires useSearchParams() to be under Suspense (CSR bailout). */}
            <Suspense fallback={null}>
                <PlaygroundToaster />
            </Suspense>
        </>
    )
}
