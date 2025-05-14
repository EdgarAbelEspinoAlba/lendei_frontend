import React, { useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
/*import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"*/

export default function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social)

    /*const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {toast.error(error.message, {
            style: {
              backgroundColor: "red",
              color: "white"
            }
          })},
        onSuccess: (result) => {
            toast.success(result, {
                style: {
                  backgroundColor: "green",
                  color: "white"
                }
              })
        }
    })*/

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ?
            { ...link, url: e.target.value } : link)
        setDevTreeLinks(updatedLinks)
    }

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)){
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error('url no válida')
                }                  
            }
            return link
        })
        setDevTreeLinks(updatedLinks)
    }

    return (
        <div className="space-y-5">
            {devTreeLinks.map(item => (
                <DevTreeInput
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleEnableLink={handleEnableLink}
                />
            )
            )}
            <button
            className="bg-yellow-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
            onClick={() => {}}
            >Guardar Cambios</button>
        </div>
    )
}