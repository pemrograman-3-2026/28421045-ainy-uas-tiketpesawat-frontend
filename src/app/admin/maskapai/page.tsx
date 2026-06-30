'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IMaskapai {
    id_maskapai: number
    nama_maskapai: string
    kode_maskapai: string
    
}

export default function AdminMaskapaiPage () {

    const [maskapais, setMaskapais] = useState<IMaskapai[]>([])

    const getData= async () => {
        try {
            const res = await api.get('maskapai/getALL')
            setMaskapais (res.data)       
        } catch (error) {
            console.log(error) 
        }
    }

    useEffect(() => {
        getData()

    }, [])

    return(
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data maskapai</h4>
                <Link href={'/admin/maskapai/create'}>
                <button type="button" className="btn btn-primary">Tambah maskapai</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                <tr>
                    <td>Nama_Maskapai</td>
                    <td>Kode_Maskapai</td>
                    <td>ini aksi</td>
                </tr>
                </thead>

                <tbody>
                    {maskapais.map(maskapai => {
                        return (
                            <tr key={maskapai.id_maskapai}>
                                <td>{maskapai.nama_maskapai}</td>
                                <td>{maskapai.kode_maskapai}</td>
                                
                                <td>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>

                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}