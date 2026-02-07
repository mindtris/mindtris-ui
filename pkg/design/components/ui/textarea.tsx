"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Visual padding size. Use `className` to override if needed.
   * Defaults to `md` to match `Input`.
   */
  size?: TextareaSize
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
}

/**
 * Textarea
 * Token-driven textarea aligned to `Input` styling.
 *
 * - Reusable component first (no business logic)
 * - Tokens-only styling
 * - Minimal state (uncontrolled by default)
 * - No hidden side effects
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full min-h-[6rem] resize-y rounded-lg border border-input bg-field text-sm text-foreground leading-5 shadow-none cursor-text m-0',
          'placeholder:text-muted-foreground',
          'hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40',
          // Use a slightly translucent muted surface so borders remain visible (esp. in themes where
          // `muted` and `input` are the same color, which can make stacked disabled fields look “merged”).
          'disabled:bg-muted/60 disabled:text-muted-foreground disabled:cursor-not-allowed',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

// ---------------------------------------------------------------------------
// RichTextEditor (Tiptap) – all text-area types in single file per CONTRIBUTING
// Production-ready: emoji picker, file attach (with image insert), link, code.
// ---------------------------------------------------------------------------

import { Tiptap, useEditor, useTiptap } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Bold, Italic, Strikethrough, List, ListOrdered, Paperclip, Smile, Code, Link as LinkIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

export type RichTextEditorSize = 'sm' | 'md' | 'lg'

const richTextSizeClasses: Record<RichTextEditorSize, string> = {
  sm: 'px-2 py-1 min-h-[5rem]',
  md: 'px-3 py-2 min-h-[6rem]',
  lg: 'px-4 py-3 min-h-[7rem]',
}

/** Common emojis for default picker (no external dependency). */
const COMMON_EMOJIS = [
  '\u{1F600}', '\u{1F603}', '\u{1F604}', '\u{1F601}', '\u{1F606}', '\u{1F605}',
  '\u{1F923}', '\u{1F602}', '\u{1F642}', '\u{1F643}', '\u{1F609}', '\u{1F60A}',
  '\u{1F607}', '\u{1F970}', '\u{1F60D}', '\u{1F929}', '\u{1F618}', '\u{1F617}',
  '\u{2764}', '\u{1F49C}', '\u{1F44D}', '\u{1F44E}', '\u{2705}', '\u{274C}',
  '\u{1F4DA}', '\u{1F4E2}', '\u{1F4E1}', '\u{1F514}', '\u{1F4A1}', '\u{2728}',
]

export interface RichTextEditorProps {
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: (html: string) => void
  disabled?: boolean
  size?: RichTextEditorSize
  showAttach?: boolean
  showEmoji?: boolean
  /** Called when attach button is clicked. If not provided, default file input is used. */
  onAttachClick?: () => void
  /** Called when emoji button is clicked. If not provided, default emoji popover is shown. */
  onEmojiClick?: () => void
  /** Called when files are selected (default flow). If not provided, first image is inserted as data URL. */
  onAttachFiles?: (files: File[]) => void
  className?: string
  editorClassName?: string
}

function EmojiPopoverContent({ onClose }: { onClose: () => void }) {
  const { editor } = useTiptap()
  if (!editor) return null
  return (
    <div className="grid grid-cols-6 gap-1 p-1 max-h-[12rem] overflow-auto">
      {COMMON_EMOJIS.map((emoji, i) => (
        <button
          key={i}
          type="button"
          className="h-8 w-8 rounded text-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          onClick={() => {
            editor.chain().focus().insertContent(emoji).run()
            onClose()
          }}
          aria-label={`Insert ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

function RichTextToolbar({
  showAttach,
  showEmoji,
  onAttachClick,
  onEmojiClick,
  emojiPopoverOpen,
  onEmojiPopoverOpenChange,
}: {
  showAttach?: boolean
  showEmoji?: boolean
  onAttachClick?: () => void
  onEmojiClick?: () => void
  emojiPopoverOpen?: boolean
  onEmojiPopoverOpenChange?: (open: boolean) => void
}) {
  const { editor } = useTiptap()
  if (!editor) return null

  const btn =
    (name: 'bold' | 'italic' | 'strike' | 'code', label: string) =>
    (onClick: () => void) =>
      (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            'inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            editor.isActive(name) && 'text-foreground'
          )}
          aria-pressed={editor.isActive(name)}
          aria-label={label}
        >
          {name === 'bold' && <Bold className="size-3" />}
          {name === 'italic' && <Italic className="size-3" />}
          {name === 'strike' && <Strikethrough className="size-3" />}
          {name === 'code' && <Code className="size-3" />}
        </button>
      )

  const setLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt('URL:', 'https://')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="flex items-center gap-0 flex-wrap">
      {btn('bold', 'Bold')(() => editor.chain().focus().toggleBold().run())}
      {btn('italic', 'Italic')(() => editor.chain().focus().toggleItalic().run())}
      {btn('strike', 'Strikethrough')(() => editor.chain().focus().toggleStrike().run())}
      {btn('code', 'Code')(() => editor.chain().focus().toggleCode().run())}
      <span className="w-px h-3.5 bg-border mx-0.5" aria-hidden />
      <button
        type="button"
        onClick={setLink}
        className={cn(
          'inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          editor.isActive('link') && 'text-foreground'
        )}
        aria-pressed={editor.isActive('link')}
        aria-label="Link"
      >
        <LinkIcon className="size-3" />
      </button>
      <span className="w-px h-3.5 bg-border mx-0.5" aria-hidden />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          editor.isActive('bulletList') && 'text-foreground'
        )}
        aria-pressed={editor.isActive('bulletList')}
        aria-label="Bullet list"
      >
        <List className="size-3" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          'inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          editor.isActive('orderedList') && 'text-foreground'
        )}
        aria-pressed={editor.isActive('orderedList')}
        aria-label="Numbered list"
      >
        <ListOrdered className="size-3" />
      </button>
      {showEmoji && (
        <>
          <span className="w-px h-3.5 bg-border mx-0.5" aria-hidden />
          {onEmojiClick ? (
            <button
              type="button"
              onClick={onEmojiClick}
              className="inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Insert emoji"
            >
              <Smile className="size-3" />
            </button>
          ) : onEmojiPopoverOpenChange != null ? (
            <Popover open={emojiPopoverOpen} onOpenChange={onEmojiPopoverOpenChange}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Insert emoji"
                >
                  <Smile className="size-3" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-auto p-0">
                <EmojiPopoverContent onClose={() => onEmojiPopoverOpenChange(false)} />
              </PopoverContent>
            </Popover>
          ) : (
            <button
              type="button"
              className="inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Insert emoji"
            >
              <Smile className="size-3" />
            </button>
          )}
        </>
      )}
      {showAttach && (
        <button
          type="button"
          onClick={onAttachClick}
          className="inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Attach file"
        >
          <Paperclip className="size-3" />
        </button>
      )}
    </div>
  )
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * RichTextEditor
 * Production-ready Tiptap editor: bold, italic, strike, code, link, lists, emoji (default picker),
 * attach (default file input; inserts image or calls onAttachFiles). All options work out of the box.
 */
export function RichTextEditor({
  placeholder = 'Type your message here…',
  defaultValue,
  value,
  onChange,
  disabled = false,
  size = 'md',
  showAttach = true,
  showEmoji = true,
  onAttachClick: onAttachClickProp,
  onEmojiClick: onEmojiClickProp,
  onAttachFiles,
  className,
  editorClassName,
}: RichTextEditorProps) {
  const [emojiPopoverOpen, setEmojiPopoverOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
    ],
    content: value ?? defaultValue ?? '',
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none w-full text-sm text-foreground leading-5 focus:outline-none',
          'px-3 pt-2 pb-1',
          richTextSizeClasses[size],
          editorClassName
        ),
      },
    },
  })

  const handleAttachClick = React.useCallback(() => {
    if (onAttachClickProp) {
      onAttachClickProp()
      return
    }
    fileInputRef.current?.click()
  }, [onAttachClickProp])

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return
      const fileList = Array.from(files)
      if (onAttachFiles) {
        onAttachFiles(fileList)
      } else if (editor) {
        const file = fileList[0]
        if (file.type.startsWith('image/')) {
          readFileAsDataUrl(file).then((src) => {
            editor.chain().focus().setImage({ src }).run()
          })
        }
      }
      e.target.value = ''
    },
    [editor, onAttachFiles]
  )

  const handleEmojiClick = React.useCallback(() => {
    if (onEmojiClickProp) {
      onEmojiClickProp()
      return
    }
    setEmojiPopoverOpen(true)
  }, [onEmojiClickProp])

  const showDefaultEmojiPopover = !onEmojiClickProp

  if (!editor) return null

  const wrapperClass = cn(
    'mindtris-rich-text-editor rounded-lg border border-input bg-field shadow-none',
    'hover:border-border/80 focus-within:outline-none focus-within:ring-0 focus-within:border-foreground/40',
    disabled && 'bg-muted opacity-70 pointer-events-none',
    className
  )

  return (
    <>
      <style>{`
        .mindtris-rich-text-editor .ProseMirror { outline: none; cursor: text; }
        .mindtris-rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: var(--muted-foreground);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .mindtris-rich-text-editor .ProseMirror ul,
        .mindtris-rich-text-editor .ProseMirror ol { padding-left: 1.5rem; }
        .mindtris-rich-text-editor .ProseMirror img { max-width: 100%; height: auto; }
      `}</style>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        aria-hidden
        onChange={handleFileChange}
      />
      <div className={wrapperClass}>
        <Tiptap instance={editor}>
          <div className="min-h-[6rem] flex flex-col">
            <div className="flex-1 min-h-0">
              <Tiptap.Content />
            </div>
            <div className="px-2 py-1.5 flex items-center">
              <RichTextToolbar
                showAttach={showAttach}
                showEmoji={showEmoji}
                onAttachClick={handleAttachClick}
                onEmojiClick={showDefaultEmojiPopover ? undefined : handleEmojiClick}
                emojiPopoverOpen={showDefaultEmojiPopover ? emojiPopoverOpen : undefined}
                onEmojiPopoverOpenChange={showDefaultEmojiPopover ? setEmojiPopoverOpen : undefined}
              />
            </div>
          </div>
        </Tiptap>
      </div>
    </>
  )
}