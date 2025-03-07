import React, { forwardRef, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style/CustomQuill.css";

const CustomQuill = forwardRef(({ value, onChange }, ref) => {
    const quillRef = useRef(null);

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["link", "image"],
                ["clean"],
            ],
        },
    };

    return (
        <ReactQuill
            ref={quillRef}
            value={value}
            onChange={onChange}
            modules={modules}
        />
    );
});

export default CustomQuill;