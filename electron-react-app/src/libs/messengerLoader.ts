import React from 'react'

export function getDocType(docName:string){
    var type =  docName.slice(docName.lastIndexOf('.', docName.length))
    if(type.includes("txt")){
        return "icon_txt"
    }
    if(type.includes("xlsx")){
        return "icon_xls"
    }
    if(type.includes("ppt")||type.includes("pptx")){
        return "icon_ppt"
    }
    if(type.includes("zip")){
        return "icon_compressed"
    }
    if(type.includes("docx")||type.includes("doc")){
        return "icon_doc"
    }
    if(type.includes("hwp")){
        return "icon_hwp"
    }
    if(type.includes("pdf")){
        return "icon_pdf"
    }
    return "icon_document"
}