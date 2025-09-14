"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function RichTextEditor({ name, value, onChange }) {
    const editorRef = useRef(null);

    return (
        <Editor
            apiKey="8ipo7umuyq109kd7c63s3pjxafx3e4t3iro76krrw5tecse4"
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={value}
            init={{
                height: 350,
                width: "100%",
                menubar: false,
                skin: "material-classic",
                content_css: "dark",
                plugins: [
                    "advlist",
                    "anchor",
                    "autolink",
                    "charmap",
                    "code",
                    "fullscreen",
                    "help",
                    "image",
                    "insertdatetime",
                    "link",
                    "lists",
                    "media",
                    "preview",
                    "searchreplace",
                    "table",
                    "visualblocks",
                ],
                toolbar:
                    "undo redo | styles | bold italic underline strikethrough | " +
                    "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                content_style: `
                  body { background-color: #111111; color: #fff; font-family: Inter, sans-serif;line-height: 1; }
                  a { color: #9AE600; }
                `,
            }}
            onEditorChange={(content) => {
                onChange({ target: { name, value: content } });
            }}
        />
    );
}
