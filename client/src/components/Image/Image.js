
import { useLocation } from 'react-router-dom';
import './Image.scss';

export default function Image ({ setImages, isAuthorized, selectedGallery, popup, setPopup }) {

    const location = useLocation();

    const requestGallery = gallery => {

        let galleryRequest = '';

        if (selectedGallery && selectedGallery !== 'all')
            galleryRequest = selectedGallery;

        fetch(`/images/${gallery ? gallery : galleryRequest}`)
            .then(res => res.json())
            .then(data => setImages(data))
                .catch(error => {});

    };

    const closePopup = () => setPopup({state: false, source: undefined, description: undefined});

    const deleteImage = () => {

        fetch('/images', {

            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gallery: selectedGallery, source: popup.source, description: popup.description })})
            .then(res => {

                if (res.ok) {

                    requestGallery(selectedGallery);
                    closePopup();
                }})
                .catch(error => {});
    };

    return (

        <section className = "popup">
            <figure className = "popup__figure">
                <img src = {popup.source} alt = {popup.description}/>
                <form className = "popup__form">
                    <button type = "button" className = "popup__button" onClick = {closePopup}>X</button>
                    {isAuthorized && location.pathname === '/gallery' &&
                    <button type = "button" className = "popup__button" onClick = { deleteImage }>D</button>}
                </form>
            </figure>
        </section>
    );
};
