import { BlockPreviewClient } from './block-preview-client'

export function generateStaticParams() {
    return [
        { slug: 'header' },
        { slug: 'footer' },
    ]
}

export default function BlockPreviewPage({ params }: { params: { slug: string } }) {
    const { slug } = params
    return <BlockPreviewClient slug={slug} />
}
