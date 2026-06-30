'use client'
import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { showToast } from "../components/toast/toast"
import { IMaskapai } from "../admin/maskapai/page"

export default function UserMaskapaiPage () {

            const [maskapais, setMaskapais] = useState<IMaskapai[]>([])

            const getData = async () => {
        try {
            const res = await api.get('maskapai/getALL')
                setMaskapais(res.data)
            } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    
   return(
        <div>
            <div className="row">
                {maskapais.map(maskapai => (
                   <div key={maskapai.id_maskapai} className="col-md-4 col-sm-6 col-xs-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{maskapai.nama_maskapai}</h5>
                            <p className="card-text">{maskapai.kode_maskapai}</p>
                            <div className="d-flex gap-1">
                                <button className="btn btn-primary">Detail</button>
                                <button className="btn btn-warning">Beli</button>
                            </div>
                        </div>
                    </div>
                   </div>
                ))}
            </div>
        </div>
    )
}