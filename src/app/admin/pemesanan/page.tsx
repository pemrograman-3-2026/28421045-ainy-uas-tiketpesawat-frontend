'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IPenumpang } from "../penumpang/page"
import { IPenerbangan } from "../penerbangan/page"
import Image from "next/image"

export interface IPemesanan {
    id_pemesanan: number
    jumlah: string
    tanggal_pesan: string
    jumlah_tiket: string
    total_harga: string
    image: string
    id_penumpang: number
    id_penerbangan: number
    penumpang: IPenumpang
    penerbangan: IPenerbangan
}

export default function AdminPemesananPage () {

    const [pemesanans, setpemesanans] = useState<IPemesanan[]>([])

    const getData= async () => {
        try {
            const res = await api.get('pemesanan/getALL')
            setpemesanans (res.data)       
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
                <h4>Data pemesanan</h4>
                <Link href={'/admin/pemesanan/create'}>
                <button type="button" className="btn btn-primary">Tambah pemesanan</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                <tr>
                    <td>jumlah</td>
                    <td>tanggal_pesan</td>
                    <td>jumlah_tiket</td>
                    <td>total_harga</td>
                    <td>image</td>
                    <td>penumpang</td>
                    <td>penerbangan</td>
                </tr>
                </thead>

                <tbody>
                    {pemesanans.map(pemesanan => {
                        return (
                            <tr key={pemesanan.id_pemesanan}>
                                <td>{pemesanan.jumlah}</td>
                                <td>{pemesanan.tanggal_pesan}</td>
                                <td>{pemesanan.jumlah_tiket}</td>
                                <td>{pemesanan.total_harga}</td>
                                <td>
                                    <Image 
                                    width={300} 
                                    height={300} 
                                    src={`${baseURL}/image/${pemesanan.image}`} 
                                    alt=""
                                    unoptimized
                                    />
                                </td>
                                <td>{pemesanan.penumpang.nama}</td>
                                <td>{pemesanan.penerbangan.kota_tujuan}</td>
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