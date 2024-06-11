
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Gallery.scss';

export default function Gallery ({showConfig}) {

    const [popup, setPopup] = useState({state: false, source: undefined, description: undefined});

    const openPopup = image => setPopup({state: true, source: image.source, description: image.description});
    const closePopup = () => setPopup({state: false, source: undefined, description: undefined});

    const [images, setImages] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [selectedGallery, selectGallery] = useState(undefined);

    const setGallery = event => selectGallery(event.target.value);

    const username = 'user1';

    const location = useLocation();

    useEffect(() => {

        fetch(`/galleries/${showConfig ? username : ''}`)
            .then(res => res.json())
            .then(data => {

                setGalleries(data);
                selectGallery(showConfig ? data[0].name : 'all');
            });

    }, [location, showConfig]);

    useEffect(() => {

        let galleryRequest = '';

        if (selectedGallery && selectedGallery !== 'all')
            galleryRequest = selectedGallery;

        fetch(`/images/${galleryRequest}`)
            .then(res => res.json())
            .then(data => setImages(data));

    }, [selectedGallery]);

    const [newGallery, setNewGallery] = useState('');

    const setNewGalleryName = event => setNewGallery(event.target.value);

    const handleCreate = async event => {

        if (newGallery.length > 2)
            fetch('/galleries', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({owner: 'user1', name: newGallery})});
    };

    const handleRemove = async event => {

        fetch(`/galleries/${selectedGallery}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }});
    };

    return (

        <>
            <form className = "galleryForm">
                <div>
                    <label htmlFor = "gallerySelect" className = "galleryForm__label">Gallery:</label>
                    <select name = "galleries" id = "gallerySelect" className = "galleryForm__list" title = "Select gallery" value = {selectedGallery} onChange = {setGallery}>
                        {!showConfig &&
                            <option value = "all">All</option>}
                        {galleries.map((gallery, index) =>
                            <option value = {gallery.name} key = {index}>{gallery.name}</option>
                        )}
                    </select>
                </div>
                {showConfig &&
                <>
                    <hr className = "galleryForm__separator"/>
                    <div className = "galleryForm__frame">
                        <input type = "text" className = "galleryForm__input" title = "Enter gallery name" placeholder = "Gallery name" value = {newGallery} onChange = {setNewGalleryName}/>
                        <button type = "button" className = "galleryForm__button" onClick = {handleCreate}>Create gallery</button>
                    </div>
                    <button type = "button" className = "galleryForm__button removeButton" onClick = {handleRemove}>Remove gallery</button>
                </>}
            </form>

            <section className = "gallery">
                {images.map((image, index) =>
                    <figure key = {index} className = "gallery__figure">
                        <img src = {image.source} alt = {image.description} onClick = {() => openPopup(image)}/>
                    </figure>
                )}
            </section>

            {popup.state &&
            <section className = "popup">
                <figure className = "popup__figure">
                    <img src = {popup.source} alt = {popup.description}/>
                    <form className = "popup__form">
                        <button type = "button" className = "popup__button" onClick = {closePopup}>X</button>
                        <button type = "button" className = "popup__button" onClick = {closePopup}>M</button>
                        <button type = "button" className = "popup__button" onClick = {closePopup}>D</button>
                    </form>
                </figure>
            </section>}
        </>
    );
};
