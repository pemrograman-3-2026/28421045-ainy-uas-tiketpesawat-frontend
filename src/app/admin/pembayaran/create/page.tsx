'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreatePembayaranPage () {

    const [status, setStatus] = useState('')
    const [metode, setMetode] = useState ('')
    const [id_pemesanan, setId_Pemesanan] = useState ('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('pembayaran/create',{
                status,
                metode,
                id_pemesanan
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Status</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Status</label>
                    <input
                    type="text" 
                    name="status"
                    className="form-control form-control-sm py2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Metode</label>
                    <input
                    type="text" 
                    name="metode"
                    className="form-control form-control-sm py2"
                    value={metode}
                    onChange={(e) => setMetode(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Id_Pemesanan</label>
                    <input
                    type="text" 
                    name="id_pemesanan"
                    className="form-control form-control-sm py2"
                    value={id_pemesanan}
                    onChange={(e) => setId_Pemesanan(e.target.value)}
                    />
                 </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}