import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-gray-700">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue} // Set default value for react-hook-form
        render={({ field: { onChange, value } }) => (
          <Editor
            // apiKey="YOUR_TINYMCE_API_KEY" // Optional, if you want to use TinyMCE cloud
            value={value} // This binds the editor's value to react-hook-form's state
            onEditorChange={(content) => onChange(content)} // Update react-hook-form's state when editor changes
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              placeholder: "Start typing here...",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
