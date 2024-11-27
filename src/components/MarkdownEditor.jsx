import React, { memo, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor = ({label, value, changeValue, name, invalidFields, setInvalidFields  }) => {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current){
    //         console.log(editorRef.current.getContent())
    //     }
    // };
    // console.log({invalidFields, name})
    // console.log(invalidFields?.some(el => el.name === name))
    return(
        <div>
            <span>{label}</span>
            <Editor
            apiKey='ixe9529gwgazviagd1odikwav4r33pj8r4q5rb18eua6m8hq'
                initialValue={value}
                // onInit = {(evt, editor) => editorRef.current = editor}
                
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visuablocks', 'code', 'fullscreen',
                        'inserdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | '+
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 14px}'
                }}
                onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
                onFocus= {() => setInvalidFields && setInvalidFields([])}
            />
            
            {invalidFields?.some(el => el.name === name) && <small className="text-xs text-red-500">{invalidFields?.find(el => el.name === name )?.mes}</small>}
            {/* <button onClick={log}>Log editor content</button> */}
        </div>

    );
}
export default memo(MarkdownEditor)