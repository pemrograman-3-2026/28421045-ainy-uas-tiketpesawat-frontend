'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { IMaskapai } from "../../maskapai/page"

export default function CreatePenerbanganPage () {

    const [kota_asal, setKota_Asal] = useState ('')
    const [kota_tujuan, setKota_Tujuan] = useState ('')
    const [harga, setHarga] = useState ('')
    const [id_maskapai, setId_Maskapai] = useState ('')
    const [maskapais, setMaskapais] = useState<IMaskapai[]>([])

    const getMaskapai = async () => {
        try {
            const res = await api.get('/maskapai/getALL')
            setMaskapais(res.data)
        } catch (error) {
            console.log(error)
        
        }
    }
    useEffect(() => {
        getMaskapai()
    },[])

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('penerbangan/create',{
                kota_asal,
                kota_tujuan,
                harga,
                id_maskapai
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            console.log(error)
            
        }
    }

    return(
        <div>
            <h4>Input Kota_Asal</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Kota_Asal</label>
                    <input
                    type="text" 
                    name="kota_asal"
                    className="form-control form-control-sm py2"
                    value={kota_asal}
                    onChange={(e) => setKota_Asal(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Kota_Tujuan</label>
                    <input
                    type="text" 
                    name="kota_tujuan"
                    className="form-control form-control-sm py2"
                    value={kota_tujuan}
                    onChange={(e) => setKota_Tujuan(e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Harga</label>
                    <input
                    type="text" 
                    name="harga"
                    className="form-control form-control-sm py2"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                        <label className="from-label small fw-semiblod">maskapai</label>
                        <select 
                        name="maskapai_id" 
                        className="from-control"
                        onChange={(e) => setId_Maskapai(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value="">Select Maskapai</option>
                        {maskapais.map(maskapai => {
                            return (
                            <option
                                key={maskapai.id_maskapai}
                                value={maskapai.id_maskapai}
                            >
                                {maskapai.nama_maskapai}
                            </option>                           )
                        }
                        )}
                        </select>
                        </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}