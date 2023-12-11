
import React from 'react'
import { Button } from 'reactstrap'


export const CardFdd = ({ 
  
   }) => (
    <div className="d-flex flex-column my-5 mx-5">
                <div className="d-flex justify-content-center mt-5"><h2>PETUNJUK PENGISIAN</h2>
                </div>

                <div className="d-flex mx-5 mt-3">
                    <strong>PERHATIKAN!</strong>
                </div>
                <div className="d-flex mx-5 ">
                    <strong>
                      1. Mengisi menggunakan huruf besar (kapital).  
                    </strong>
                    
                </div>
                <div className="d-flex mx-5 ">
                    <strong> 2. Pastikan bagian dengan tanda bintang terisi keseluruhan sebelum lanjut ke halaman berikutnya</strong>
                   
                </div>
                <div className="d-flex mx-5 ">
                    <strong>
                      3. Pastikan mengisi data sesuai kondisi yang sebenar-benarnya dan sesuai data Anda yang terkini  
                    </strong>
                    
                </div>
                <div className="d-flex justify-content-center my-3">
                    <strong>
                      Apakah Anda memahami petunjuk pengisian data berikut?  
                    </strong>
                    
                </div>
                <div className="d-flex justify-content-center">
                    <span className="mr-1">
                        <Button color="primary">Ya, Selanjutnya</Button>
                    </span>
                    <span className="ml-1">
                        <Button color="danger">Tidak</Button>
                    </span>
                </div>
                    
            </div>
)

