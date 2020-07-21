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

export function getShortName(name: string) {
    if (name) {
        if (name.match(/[a-zA-Z]/)) {
            var idx = name.lastIndexOf(" ");
            if (idx > -1) {
                return name.substring(0, 1) + name.substring(idx + 1, idx + 2);
            } else {
                return name.substring(0, 2);
            }
        } else {
            if (name.length < 3) {
                return name.substring(0, 1);
            } else if (name.length == 3) {
                return name.substring(1, 3);
            } else if (name.length == 4) {
                return name.substring(2, 4);
            } else {
                return name.substring(0, 2);
            }
        }
    }
}
