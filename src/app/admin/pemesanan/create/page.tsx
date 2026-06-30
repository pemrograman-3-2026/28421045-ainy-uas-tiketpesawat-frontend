'use client'
import { showToast } from "@/app/components/toast/toast"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { IPenerbangan } from "../../penerbangan/page"
import { IPemesanan } from "../page"
import { IPenumpang } from "../../penumpang/page"

export default function CreatePemesananPage () {

    const [jumlah, setJumlah] = useState('')
    const [jumlah_tiket, setJumlah_Tiket] = useState ('')
    const [total_harga, setTotal_Harga] = useState ('')
    const [id_penumpang, setId_Penumpang] = useState ('')
    const [id_penerbangan, setId_Penerbangan] = useState ('')
    const [penumpangs, setpenumpangs] = useState<IPenumpang[]>([])
    const [penerbangans, setPenerbangans] = useState<IPenerbangan[]>([])
    const [image, setImage] = useState<File | null>(null)

    const getpenumpang = async () => {
            try {
                const res = await api.get('/penumpang/getALL')
                setpenumpangs(res.data)
            } catch (error) {
                console.log(error)
            
            }
        }
        useEffect(() => {
            getpenumpang()
        },[])

    const getPenerbangan = async () => {
            try {
                const res = await api.get('/penerbangan/getALL')
                setPenerbangans(res.data)
            } catch (error) {
                console.log(error)
            
            }
        }
        useEffect(() => {
            getPenerbangan()
        },[])
    
    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
         try {
        const formData = new FormData()
        formData.append('jumlah', jumlah)
        formData.append('jumlah_tiket', jumlah_tiket.toString())
        formData.append('total_harga', total_harga)
        formData.append('id_penumpang', id_penumpang.toString())
        formData.append('id_penerbangan', id_penerbangan.toString())

        if (!image) {
            showToast('Mohon pilih gambar', 'danger')
            return
        }

        formData.append('image', image)

        const res = await api.post('pemesanan/create', formData)
        showToast(res.data.message, 'success')
     } catch (error) {
        console.log(error)
     }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    }

    return(
        <div>
            <h4>Input Jumlah</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Jumlah</label>
                    <input
                    type="text" 
                    name="jumlah"
                    className="form-control form-control-sm py2"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Jumlah_Tiket</label>
                    <input
                    type="text" 
                    name="jumlah_tiket"
                    className="form-control form-control-sm py2"
                    value={jumlah_tiket}
                    onChange={(e) => setJumlah_Tiket(e.target.value)}
                    />
                 </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Total_Harga</label>
                    <input
                    type="text" 
                    name="total_harga"
                    className="form-control form-control-sm py2"
                    value={total_harga}
                    onChange={(e) => setTotal_Harga(e.target.value)}
                    />
                 </div>
                 <div className="mb-3">
                        <label className="from-label small fw-semiblod">penumpang</label>
                        <select 
                        name="id_pemesanan" 
                        className="from-control"
                        onChange={(e) => setId_Penumpang(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value="">Select pemesanan</option>
                        {penumpangs.map(penumpang => {
                            return (
                            <option
                                key={penumpang.id_penumpang}
                                value={penumpang.id_penumpang}
                            >
                                {penumpang.id_penumpang}
                            </option>                           )
                        }
                        )}
                        </select>
                 </div>
                 <div className="mb-3">
                        <label className="from-label small fw-semiblod">penerbangan</label>
                        <select 
                        name="id_penerbangan" 
                        className="from-control"
                        onChange={(e) => setId_Penerbangan(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value="">Select penerbangan</option>
                        {penerbangans.map(penerbangan => {
                            return (
                            <option
                                key={penerbangan.id_penerbangan}
                                value={penerbangan.id_penerbangan}
                            >
                                {penerbangan.id_penerbangan}
                            </option>                           )
                        }
                        )}
                        </select>
                 </div>
                  <div className="mb-3">
                        <label className="form-label small fw-semibold">Image</label>
                        <input 
                        type="file" 
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                        />
                        </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}