'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreateMaskapaiPage () {

    const [nama_maskapai, setNama_Maskapai] = useState ('')
    const [kode_maskapai, setKode_Maskapai] = useState ('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('maskapai/create',{
                nama_maskapai,
                kode_maskapai
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Nama_Maskapai</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Nama Maskapai</label>
                    <input
                    type="text" 
                    name="nama_maskapai"
                    className="form-control form-control-sm py2"
                    value={nama_maskapai}
                    onChange={(e) => setNama_Maskapai(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Kode Maskapai</label>
                    <input
                    type="text" 
                    name="kode_maskapai"
                    className="form-control form-control-sm py2"
                    value={kode_maskapai}
                    onChange={(e) => setKode_Maskapai(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}