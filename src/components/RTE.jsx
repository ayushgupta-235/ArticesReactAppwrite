import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function RTE({
    name,
    control, //control is object which is required by react-hook-form for managing form state. 
    defaultValue = '', 
    label
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* TinyMCE Editor with React Hook Form */}
      <Controller //Controller connects the editor to react-hook-form.
        name={name || "content"}
        control={control} //control → Comes from useForm() and manages form state.
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;