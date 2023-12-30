import React from 'react'
import "./QRPage.css"
import boyVector from "./boyAvatar.jpg"
import AspectRatio from '@mui/joy/AspectRatio';
import QRCode from "react-qr-code";

const QRPdf2 = () => {
    return (
        <div className='modalQR'>
            <div className="photoSectionPartQR"><img src={boyVector} alt="" /></div>
            <div className="tableSectionQRModal">
                <table>

                    <tr>
                        <td>Name</td>
                        <td>Abhinav</td>

                    </tr>
                    <tr>
                        <td>Account Number</td>
                        <td>0xaafa5725618a456b3caE5ED41e00aF73A079B88b	</td>

                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>abhinav@gmail.com</td>

                    </tr>

                    <tr>
                        <td>Phone Number</td>
                        <td>9898989598</td>

                    </tr>
                </table>
            </div>
            <div className="qrSectionModal">
                <AspectRatio minHeight="120px" maxHeight="150px">
                    <div style={{ margin: "0 auto", maxWidth: 220, width: "100%" }}  >
                        <QRCode
                            size={500}
                            style={{ maxWidth: "100%", width: "100%" }}
                            value={"www.google.com"}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </AspectRatio>
            </div>
        </div>
    )
}

export default QRPdf2