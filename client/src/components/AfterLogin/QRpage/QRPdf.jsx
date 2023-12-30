import React, { useEffect } from 'react'
import QRCode from "react-qr-code";

import AspectRatio from '@mui/joy/AspectRatio';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import "./QRPage.css"

import Box from '@mui/material/Box';
import boyVector from "./boyAvatar.jpg"
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import Button2 from "@mui/joy/Button"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePDF } from 'react-to-pdf';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Name', localStorage.getItem("userinfovkname")),
    createData('Account Number', localStorage.getItem("userinfovkaccno")),
    createData('Email', localStorage.getItem("userinfovkemail")),
    createData('Phone Number', localStorage.getItem("userinfovkphoneno"))
];


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const QRPdf = (props) => {
    useEffect(() => {
        setTimeout(() => {
            
            // console.log(localStorage.getItem("userInfoVK"), "Is your storage item")
        }, 5000);
        return () => {

        }
    }, [])

    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    return (

        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <div >


                <Box sx={style}>
                    <div className="headSectionOfQR"><h2>Bhartiya Kanoon Portable Document</h2></div>
                    <Typography className="QRTopo">Handled By the largest server of India</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>

                            </TableHead>
                            
                            <div className="tableBodySectionAll">
                                <div className="photoSectionPartQR"><img src={boyVector} alt="" /></div>
                                <TableBody className='  '>
                                    {rows.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {/* <div className="photoSectionPartQR"><img src={boyVector} alt="" /></div>     */}

                                <AspectRatio minHeight="120px" maxHeight="150px">
                                    <div style={{ margin: "0 auto", maxWidth: 220, width: "100%" }}  >
                                        <QRCode
                                            size={500}
                                            style={{ maxWidth: "100%", width: "100%" }}
                                            value={`https://bhartiyaportal.vercel.app/${localStorage.getItem("userinfovkaccno")}`}
                                            viewBox={`0 0 256 256`}
                                            />
                                    </div>
                                </AspectRatio>

                            </div>

                        </Table>


                    </TableContainer>

                    <div className="PrintBtnQR">
                        <Button2 
                        onClick={(()=>{print()})}
                        // onclick="printJS({printable: base64, type: 'pdf', base64: true})"
                        >Print</Button2>

                    </div>
                </Box>
            </div>




        </Modal>
        
    )
}

export default QRPdf