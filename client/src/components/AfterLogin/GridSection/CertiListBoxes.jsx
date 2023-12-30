import React from 'react'
import "./CertiListBoxes.css"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { useRef, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { revokeAccess, shareAccess } from "../../actions/certificateAction";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import HackContext from '../../../Context/HackContext';
import axios from "axios";
import { gsap } from 'gsap'
import { useLayoutEffect, useEffect } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
const GetIpfsUrlFromPinata = (pinataUrl) => {
  var IPFSUrl = pinataUrl.split("/");
  const lastIndex = IPFSUrl.length;
  IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
  return IPFSUrl;
};



const CertiListBoxes = (props) => {


  const viewSummaryFunction = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyChRhfdj2OHN5iOyrl1oO5Gl9A7zxJGu5Y",
        authDomain: "bhartiya-kanoon-1.firebaseapp.com",
        databaseURL: "https://bhartiya-kanoon-1-default-rtdb.firebaseio.com",
        projectId: "bhartiya-kanoon-1",
        storageBucket: "bhartiya-kanoon-1.appspot.com",
        messagingSenderId: "127739662566",
        appId: "1:127739662566:web:aaa5514db3415fd100ab27",
        measurementId: "G-J1JW88WNW6"
    };
    const fapp = initializeApp(firebaseConfig);
    const newFileName = props.i.cert_id + 's';
    const storage = getStorage(fapp);
    const storageRef = ref(storage , newFileName);
    
    getDownloadURL(storageRef)
    .then((url) => {
        window.open(url);
        
    })
    .catch((error) => {
      
        window.open(props.i.ipfsLink);
    });
    
};

  useEffect(() => {

    gsap.to(".dashBoardRow", {
      opacity: 1,
      // y:0,
      height: "10vh",
      stagger: 0.2,

    })

    return () => {

    }
  }, [])


  const handleOnMenuHover = () => {
    menuVisible.current.style.visibility = "visible";
    menuVisible.current.style.opacity = "1";
    menuVisible.current.style.zIndex = "10";
    certiMenuRef.current.style.zIndex = "10"

  };
  const handleOnMenuOut = () => {
    menuVisible.current.style.opacity = "0";
    menuVisible.current.style.zIndex = "-2";
    certiMenuRef.current.style.zIndex = "-2"
    menuVisible.current.style.visibility = "hidden";
  };

  const [AddressVar, setAddressVar] = useState("");
  const [revokeAddressVar, setRevokeAddressVar] = useState();
  const handleAddressVarChange = (e) => {
    setAddressVar(e.target.value);
  }

  const handleRevokeAddressVarChange = (e) => {
    setRevokeAddressVar(e.target.value);
  }
  const context = useContext(HackContext);
  const { provider, account, contract } = context;
  const giveAccessFncn = async (e) => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {
      if (i.tokenId.toNumber() === Number(certToken) && !check) {
        check = true;
        await contract.giveAccess(i.tokenId, AddressVar)
      }
    }))
  };

  const revokeAccessFncn = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {

      if (i.tokenId.toNumber() === Number(certToken) && !check) {
        check = true;
        await contract.cancelAccess(i.tokenId, revokeAddressVar)

      }
    }))
  }

  const viewCertFuncn = async (e) => {
    console.log("View clicked")
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {

      if (i.tokenId.toNumber() === Number(certToken) && !check) {
        check = true;
        var tokenURI = await contract.tokenURI(i.tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let item = {
          tokenId: i.tokenId.toNumber(),

          owner: i.owner,
          org: i.organization,
          employee: i.employee,

          image: meta.image,
          name: meta.name,
          description: meta.description,
        }
        console.log(item.name);
        console.log(item.image);
        window.open(item.image);
      }
    }))
  };


  const popUpAddAccess = useRef();
  const popUpAddAccessBg = useRef();
  const popUpAddAccessList = useRef();
  const popUpAddAccessListBg = useRef();
  const menuVisible = useRef();
  const certiMenuRef = useRef()
  const labelForInp = useRef()
  const labelForInp2 = useRef()

  const handleOnAccessPopUpRemove = () => {
    popUpAddAccess.current.style.display = "none"
    popUpAddAccessBg.current.style.display = "none"
  }
  const handleAccessListPopUpShow = () => {
    popUpAddAccessList.current.style.display = "flex";
    popUpAddAccessListBg.current.style.display = "block";
  }
  const handleAccessListPopUpRemove = () => {
    popUpAddAccessList.current.style.display = "none";
    popUpAddAccessListBg.current.style.display = "none";
  }

  const handleOnAccessPopUpShow = () => {
    popUpAddAccess.current.style.display = "flex"
    popUpAddAccessBg.current.style.display = "block"
    console.log("clikced")
  }
  const openPopup = () => {
    handleOnAccessPopUpShow()
  };
  const handleGetId = () => {
    navigator.clipboard.writeText(props.i.cert_id);
  };


  const handleClick = (e, data) => {
    console.log(dat)
  }
  return (
    <>
      <div onClick={handleOnAccessPopUpRemove} ref={popUpAddAccessBg} className="popBack"></div>
      <div ref={popUpAddAccess} className="popUpWindowDash">
        <div className="inpWindowPopUpDiv">
          <input className="inpWindowPopUp" value={AddressVar} onChange={handleAddressVarChange} type="text" />
          <label ref={labelForInp} className="inpWindowUserLabel">User's Account</label>
        </div>
        <div className="popUpBtnAddAccess">
          <button className="button-4" onClick={giveAccessFncn}>Add Access</button>

        </div>
      </div>

      <div onClick={handleAccessListPopUpRemove} ref={popUpAddAccessListBg} className="popBack"></div>
      <div className='certiListBox'>
        <ContextMenuTrigger id="same_unique_identifier">
          <i class="fa-solid fa-file-lines"></i>
        </ContextMenuTrigger>
        <div className="certiListLabel"><label htmlFor="">{props.certName}</label></div>
      </div>

      <div ref={popUpAddAccessList} className="popUpWindowDash">
        <div className="inpWindowPopUpDiv">
          <input type="text" className="inpWindowPopUp" onChange={handleRevokeAddressVarChange} value={revokeAddressVar} />
          <label ref={labelForInp2} className="inpWindowUserLabel">User's Account</label>
        </div>
        <div className="popUpBtnAddAccess">
          <button className="button-4" onClick={revokeAccessFncn}>Revoke Access</button>
        </div>
      </div>

      <ContextMenu id="same_unique_identifier">
        <MenuItem data={{ foo: 'bar' }} onClick={handleAccessListPopUpShow}>
          Revoke Access
        </MenuItem>
        <MenuItem onClick={viewCertFuncn}>
          View
        </MenuItem>
        
        <MenuItem data={{ foo: 'bar' }} onClick={viewSummaryFunction}>
          View Summary
        </MenuItem>
      </ContextMenu>
    </>
  )
}

export default CertiListBoxes