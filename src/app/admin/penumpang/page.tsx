'use client'
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IPenumpang {
    id_penumpang: number
    nama: string
    email: string
    no_telp: string
    pemesanan: string
}

export default function AdminPenumpangPage () {

    const [penumpangs, setpenumpangs] = useState<IPenumpang[]>([])

    const getData= async () => {
        try {
            const res = await api.get('penumpang/getALL')
            setpenumpangs (res.data)       
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
                <h4>Data penumpang</h4>
                <Link href={'/admin/penumpang/create'}>
                <button type="button" className="btn btn-primary">Tambah penumpang</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                <tr>
                    <td>nama</td>
                    <td>email</td>
                    <td>no_telp</td>
                    <td>pemesanan</td>
                </tr>
                </thead>

                <tbody>
                    {penumpangs.map(penumpang => {
                        return (
                            <tr key={penumpang.id_penumpang}>
                                <td>{penumpang.nama}</td>
                                <td>{penumpang.email}</td>
                                <td>{penumpang.no_telp}</td>
                                <td>{penumpang.pemesanan}</td>
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