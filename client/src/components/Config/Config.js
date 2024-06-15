
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Config.scss';

export default function Config ({ username, showConfig, selectedGallery, selectGallery, change, registerChange }) {

    const [ galleries, setGalleries ] = useState([]);
    const [ typedGallery, setTypedGallery ] = useState('')
    const [ creationErrorMessage, setCreationErrorMessage ] = useState('')
    const [ deletionErrorMessage, setDeletionErrorMessage ] = useState('')

    const setGallery = event => selectGallery(event.target.value);

    const location = useLocation();

    useEffect(() => {

        fetch(`/galleries/${showConfig ? username : ''}`)
            .then(res => res.json())
            .then(data => {

                setGalleries(data);

                if (typedGallery)
                    selectGallery(typedGallery);

                else if (!showConfig)
                    selectGallery('all');

                else if (data[0])
                    selectGallery(data[0].name);

                else selectGallery('');

                setTypedGallery('');
            });

    }, [location, showConfig, change]);

    const setNewGalleryName = event => setTypedGallery(event.target.value);

    const handleGalleryCreation = async () => {

        if (!typedGallery.length) {

            setCreationErrorMessage('Enter gallery name');
            setTimeout(() => setCreationErrorMessage(''), 1500);
        }

        else if (typedGallery.length < 3) {

            setCreationErrorMessage('Too short');
            setTimeout(() => setCreationErrorMessage(''), 1500);
        }

        else fetch('/galleries', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({owner: username, name: typedGallery})})
            .then(res => {

                if (res.ok) registerChange(1 - change);

                return res.json()
            })
            .then(message => {

                setCreationErrorMessage(message);
                setTimeout(() => setCreationErrorMessage(''), 1500);
            })
                .catch(error => {});
    };

    const handleGalleryDeletion = async () =>
        fetch(`/galleries/${selectedGallery}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }})
            .then(res => {

                if (res.ok) registerChange(1 - change);

                return res.json()
            })
            .then(message => {

                setDeletionErrorMessage(message);
                setTimeout(() => setDeletionErrorMessage(''), 1500);
            })
                .catch(error => {});

    return (

        <form className = "galleryForm">
            <div>
                <label htmlFor = "gallerySelect" className = "galleryForm__label">Gallery:</label>
                <select name = "galleries" id = "gallerySelect" className = "galleryForm__list" title = "Select gallery" value = { selectedGallery } onChange = { setGallery }>
                    {!showConfig && <option value = "all">All</option>}
                    {galleries.map((gallery, index) =>
                        <option value = { gallery.name } key = { index }>{ gallery.name }</option>
                    )}
                </select>
            </div>
            {showConfig &&
            <>
                <hr className = "galleryForm__separator"/>
                <div className = "galleryForm__box">
                    <input type = "text" className = "galleryForm__input" title = "Enter gallery name" placeholder = "Gallery name"
                        value = { typedGallery } onChange = {setNewGalleryName}/>
                    <div className = "galleryForm__frame">
                        <button type = "button" className = "galleryForm__button" onClick = { handleGalleryCreation }>Create gallery</button>
                        <span className = {"galleryForm__error" + (creationErrorMessage ? " galleryForm__error--visible" : "")}>{ creationErrorMessage }</span>
                    </div>
                </div>
                <div className = "galleryForm__frame galleryForm__frame--indent">
                    <button type = "button" className = "galleryForm__button" onClick = {handleGalleryDeletion}>Remove gallery</button>
                    <span className = {"galleryForm__error" + (deletionErrorMessage ? " galleryForm__error--visible" : "")}>{ deletionErrorMessage }</span>
                </div>
            </>}
        </form>
    );
};
