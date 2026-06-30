'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useState } from "react"

export default function CreatePenumpangPage () {

    const [nama, setNama] = useState ('')
    const [email, setEmail] = useState ('')
    const [no_telp, setNo_Telp] = useState ('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('penumpang/create',{
                nama,
                email,
                no_telp
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Nama</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Nama</label>
                    <input
                    type="text" 
                    name="nama"
                    className="form-control form-control-sm py2"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Email</label>
                    <input
                    type="text" 
                    name="email"
                    className="form-control form-control-sm py2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">No_Telp</label>
                    <input
                    type="text" 
                    name="no_telp"
                    className="form-control form-control-sm py2"
                    value={no_telp}
                    onChange={(e) => setNo_Telp(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}