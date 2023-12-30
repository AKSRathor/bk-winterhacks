import React, { useState } from 'react'
import QRCode from "react-qr-code";

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
//import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import "./QRPage.css"
import { usePDF } from 'react-to-pdf';
import QRPdf from './QRPdf';




const MyQR = () => {

    const qmt = () => {
        return (
            <>
                <div className="textSection">THIs is text</div>
            </>
        )
    }
   


    return (
        <>

            <div className="allCardSectionOfQR">

                <Card sx={{ width: 400 }}>
                    <div>
                        <Typography level="title-lg">Woah! Your QR Code is ready</Typography>
                        <Typography level="body-sm">Donwload and save for your portable documents</Typography>
                        <IconButton
                            aria-label="bookmark Bahamas Islands"
                            variant="plain"
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                        >
                        </IconButton>
                    </div>
                    <AspectRatio minHeight="120px" maxHeight="200px">
                        <div style={{ margin: "0 auto", maxWidth: 180, width: "100%" }}  >

                            <QRCode
                                size={300}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={"www.google.com"}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </AspectRatio>
                    <CardContent orientation="horizontal">

                        <Button
                            variant="solid"
                            size="md"
                            color="primary"
                            aria-label="Explore Bahamas Islands"
                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                            onClick={() => toPDF()}
                        >
                            Download Now
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <QRPdf handleOpen = {handleOpen} handleClose = {handleClose} open = {open} />




        </>
    )
}

export default MyQR
