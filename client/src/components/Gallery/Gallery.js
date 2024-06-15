
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Config from '../Config/Config.js';
import Image from '../Image/Image.js';

import './Gallery.scss';

export default function Gallery ({ isAuthorized, showConfig }) {

    const navigate = useNavigate();

    useEffect(() => {if (showConfig && !isAuthorized) navigate('/')});

    const [ popup, setPopup ] = useState({state: false, source: undefined, description: undefined});

    const openPopup = image => setPopup({state: true, source: image.source, description: image.description});

    const location = useLocation();

    useEffect(() =>
        setPopup({state: false, source: undefined, description: undefined}
    ), [location]);

    const [ images, setImages ] = useState([]);
    const [ selectedGallery, selectGallery ] = useState(undefined);

    const [ change, registerChange ] = useState(0);

    const requestGallery = gallery => {

        if (selectedGallery) {

            let galleryRequest = '';

            if (selectedGallery !== 'all')
                galleryRequest = selectedGallery;

            fetch(`/images/${gallery ? gallery : galleryRequest}`)
                .then(res => res.json())
                .then(data => setImages(data))
                    .catch(error => {});
        }

        else setImages([]);
    };

    useEffect(requestGallery, [selectedGallery]);

    const fileInput = useRef(undefined);

    const handleFileUpload = () => fileInput.current.click();

    const [ file, setFile ] = useState();

    const handleFileChange = event => setFile(event.target.files[0]);

    useEffect(() => {

        const data = new FormData();

        data.append('owner', isAuthorized);
        data.append('gallery', selectedGallery);
        data.append('file', file);

        fetch('/images', {

            method: 'POST',
            body: data})
            .then(res => { if (res.ok) requestGallery(selectedGallery); })
                .catch(error => {});
    }, [file]);

    return (

        <>
            <Config username = { isAuthorized } showConfig = { showConfig } selectedGallery = { selectedGallery } selectGallery = { selectGallery } change = { change } registerChange = { registerChange }/>

            <section className = "gallery">
                {images.map((image, index) =>
                    <figure key = {index} className = "gallery__figure">
                        <img src = {image.source} alt = {image.description} onClick = {() => openPopup(image)}/>
                    </figure>
                )}
                {isAuthorized && location.pathname === '/gallery' && selectedGallery !== '' &&
                <div className = "gallery__figure">
                    <button className = "gallery__placeholder" onClick = { handleFileUpload }>+</button>
                    <input type = "file" ref = { fileInput } onChange = { handleFileChange }/>
                </div>}
            </section>

            {popup.state && <Image setImages = { setImages } isAuthorized = { isAuthorized } selectedGallery = { selectedGallery } popup = { popup } setPopup = { setPopup }/>}
        </>
    );
};
