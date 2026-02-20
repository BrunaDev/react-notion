import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { initialContent } from "./initialContent";
import { lowlight } from 'lowlight/lib/common';
import js from 'highlight.js/lib/languages/javascript';

import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode, RxChevronDown, RxChatBubble } from "react-icons/rx";

import 'highlight.js/styles/tokyo-night-dark.css';
import { BubbleButton } from "./BubbleButton";
import { FloatButton } from "./FloatButton";

lowlight.registerLanguage('javascript', js);

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({ lowlight }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'outline-none',
            }
        }
    });

    return (
        <>
            <EditorContent
                className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-sky"
                editor={editor}
            />
            { editor && (
                <FloatingMenu 
                    editor={editor}
                    className="bg-zinc-700 py-2 px-1 shadow-xl gap-1 border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
                    shouldShow={({ state }) => {
                        const { $from } = state.selection;

                        const currentLineText = $from.nodeBefore?.textContent;

                        return currentLineText === '/';
                    }}
                >
                    <FloatButton>
                        <img
                            src="http://www.notion.so/images/blocks/text/en-US.png"
                            alt="Text"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Text</span>
                            <span className="text-xs text-zinc-400">Just start writing with plain text.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        <img
                            src="http://www.notion.so/images/blocks/header.57a7576a.png"
                            alt="Heading"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Header 1</span>
                            <span className="text-xs text-zinc-400">Big section heading.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <img
                            src="http://www.notion.so/images/blocks/subheader.9aab4769.png"
                            alt="Heading2"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Header 2</span>
                            <span className="text-xs text-zinc-400">Medium section heading.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                        <img
                            src="http://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
                            alt="Heading3"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Header 3</span>
                            <span className="text-xs text-zinc-400">Small section heading.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        <img
                            src="http://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
                            alt="BulletedList"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Bolleted list</span>
                            <span className="text-xs text-zinc-400">Create a simple bulleted list.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        <img
                            src="http://www.notion.so/images/blocks/numbered-list.0406affe.png"
                            alt="NumeredList"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Numered list</span>
                            <span className="text-xs text-zinc-400">Create a list with numbering.</span>
                        </div>
                    </FloatButton>
                    <FloatButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        <img
                            src="https://www.notion.so/images/blocks/code.a8b201f4.png"
                            alt="CodeBlock"
                            className="w-12 border border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Code block</span>
                            <span className="text-xs text-zinc-400">Capture a code snippet.</span>
                        </div>
                    </FloatButton>
                </FloatingMenu>
            )}
            { editor && (
                <BubbleMenu className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600" editor={editor}>
                    <BubbleButton>
                        Text
                        <RxChevronDown className="w-5 h-5" />
                    </BubbleButton>
                    <BubbleButton>
                        Comment
                        <RxChatBubble className="w-5 h-5" />
                    </BubbleButton>
                    <div className="flex items-center">
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            data-active={editor.isActive('bold')}
                        >
                            <RxFontBold className="w-5 h-5" />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            data-active={editor.isActive('italic')}
                        >
                            <RxFontItalic className="w-5 h-5" />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            data-active={editor.isActive('strike')}
                        >
                            <RxStrikethrough className="w-5 h-5" />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            data-active={editor.isActive('code')}
                        >
                            <RxCode className="w-5 h-5" />
                        </BubbleButton>
                    </div>
                </BubbleMenu>
            )}
        </>
    );
}
