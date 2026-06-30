'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IMaskapai } from "../maskapai/page"

export interface IPenerbangan {
    id_penerbangan: number
    kota_asal: string
    kota_tujuan: string
    waktu_berangkat: string
    waktu_tiba: string
    harga: string
    id_maskapai: number
    maskapai: IMaskapai
}

export default function AdminPenerbanganPage () {

    const [penerbangans, setpenerbangans] = useState<IPenerbangan[]>([])

    const getData= async () => {
        try {
            const res = await api.get('penerbangan/getALL')
            setpenerbangans (res.data)       
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
                <h4>Data penerbangan</h4>
                <Link href={'/admin/penerbangan/create'}>
                <button type="button" className="btn btn-primary">Tambah penerbangan</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                <tr>
                    <td>kota_asal</td>
                    <td>kota_tujuan</td>
                    <td>waktu_berangkat</td>
                    <td>waktu_tiba</td>
                    <td>harga</td>
                    <td>maskapai</td>
                </tr>
                </thead>

                <tbody>
                    {penerbangans.map(penerbangan => {
                        return (
                            <tr key={penerbangan.id_penerbangan}>
                                <td>{penerbangan.kota_asal}</td>
                                <td>{penerbangan.kota_tujuan}</td>
                                <td>{penerbangan.waktu_berangkat}</td>
                                <td>{penerbangan.waktu_tiba}</td>
                                <td>{penerbangan.harga}</td>
                                <td>{penerbangan.maskapai.nama_maskapai}</td>
                                <td>ini aksi</td>
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