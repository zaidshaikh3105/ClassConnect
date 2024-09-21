import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-lg font-semibold text-white">
          {label}
        </label>
      )}
      <div className="card bg-base-100 shadow-md p-4">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey="8dz2qa3vu1bczf3qqfnp35ek2we54zovkr8v5igfod8wglcg"
              value={value}
              onEditorChange={(content) => onChange(content)}
              init={{
                height: 800,
                menubar: true, // Enable the menubar
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "directionality", // Support for text direction (LTR/RTL)
                  "emoticons", // Emojis
                  "codesample", // Code snippets
                ],
                toolbar:
                  "undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table | emoticons | fullscreen | help",
                toolbar_sticky: true, // Keeps the toolbar fixed at the top
                placeholder: "Start typing here...",
                content_style: `
                body {
                  font-family: Arial, sans-serif; 
                  font-size: 14px; 
                  line-height: 1.6;
                }
              `,
                style_formats: [
                  // Custom style formats
                  { title: "Header 1", block: "h1" },
                  { title: "Header 2", block: "h2" },
                  { title: "Header 3", block: "h3" },
                  { title: "Paragraph", block: "p" },
                  { title: "Blockquote", block: "blockquote" },
                ],
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
