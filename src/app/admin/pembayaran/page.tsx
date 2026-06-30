'use client'
import { showToast } from "@/app/components/toast/toast"
import { api, baseURL } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface IPembayaran {
    id_pembayaran: number
    status: string
    metode: string
    tanggal_bayar: string
    id_pemesanan: number

}

export default function AdminPembayaranPage () {

    const [pembayarans, setPembayarans] = useState<IPembayaran[]>([])

    const getData= async () => {
        try {
            const res = await api.get('pembayaran/getALL')
            setPembayarans (res.data)       
        } catch (error) {
            console.log(error) 
        }
    }

    useEffect(() => {
        getData()

    }, [])

    const deleteData = async (id: number) => {
            const isAgree = confirm('Are you sure?')
    
            if (isAgree) {
                try {
                  const res =  await api.delete(`pembayaran/delete/${id}`)
                  showToast(res.data.message, 'success')
                  getData()
                } catch (error: any) {
                    showToast(error.response.data.message, 'danger')
                    
                }
            }
        }

    return(
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data Pembayaran</h4>
                <Link href={'/admin/pembayaran/create'}>
                <button type="button" className="btn btn-primary">Tambah Pembayaran</button>
                </Link>
            </div>

            <table className="table mt-4 table-hover table-striped">
                <thead>
                <tr>
                    <td>status</td>
                    <td>metode</td>
                    <td>tanggal_bayar</td>
                    <td>id_pemesanan</td>
                    <td>ini aksi</td>
                </tr>
                </thead>

                <tbody>
                    {pembayarans.map(Pembayaran => {
                        return (
                            <tr key={Pembayaran.id_pembayaran}>
                                <td>{Pembayaran.status}</td>
                                <td>{Pembayaran.metode}</td>
                                <td>{Pembayaran.tanggal_bayar}</td>
                                <td>{Pembayaran.id_pemesanan}</td>

                                <td>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                         <button onClick={() => deleteData(Pembayaran.id_pembayaran)} type="button" className="btn btn-danger">Delete</button>

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